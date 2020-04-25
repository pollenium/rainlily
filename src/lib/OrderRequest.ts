import { OrderStruct, Order, EngineReader, SignedOrder, OrderDirection } from 'pollenium-alchemilla'
import { Snowdrop } from 'pollenium-snowdrop'
import { Client as AnemoneClient, MissiveGenerator } from 'pollenium-anemone'
import { Bellflower } from 'pollenium-bellflower'
import { Uu, Uish } from 'pollenium-uvaursi'
import { Uint256, Uintable, Address } from 'pollenium-buttercup'
import { Keypair } from 'pollenium-ilex'
import { Primrose } from 'pollenium-primrose'
import { Market } from './Market'
import { BopType } from '../BopType'
import { calcOrderExpiration } from '../lib/calcOrderExpiration'
import { genEpoch } from '../lib/genEpoch'
import { e18 } from '../globals/e18'
import delay from 'delay'

export enum OrderRequestStatus {
  OPEN = 'Open',
  CANCELLING = 'Cancelling',
  CANCELLED = 'Cancelled',
  FILLED = 'Filled'
}

export interface OrderRequestStruct extends Omit<OrderStruct, 'variToken'|'expiration'|'tokenLimit'> {
  keypair: Keypair,
  market: Market,
  bopType: BopType,
  originalBlockNumber: Uintable,
  latency: number,
  anemoneClient: AnemoneClient,
  engineReader: EngineReader,
  applicationId: Uish,
  bellflower: Bellflower,
  variTokenLimit: Uintable
}

export class OrderRequest {

  readonly createdAt: number = genEpoch()
  readonly cumulativeFillSnowdrop = new Snowdrop<Uint256>()
  readonly variTokenCumulativeFillSnowdrop = new Snowdrop<Uint256>()
  readonly statusSnowdrop = new Snowdrop<OrderRequestStatus>()

  private status: OrderRequestStatus = OrderRequestStatus.OPEN
  private tokenLimit: Uint256
  private cumulativeFill: Uint256 | null = null
  private variTokenCumulativeFill: Uint256 | null = null
  private latestSignedOrder: SignedOrder | null = null

  private cumulativeFillPromisesByBlockIndexNumberString: { [blockIndexNumberString: string]: Promise<Uint256> } = {}
  private signedOrdersByExpirationNumberString: { [expirationNumberString: string]: SignedOrder } = {}

  constructor(readonly struct: OrderRequestStruct) {


    const handleId = struct.bellflower.blockIndexSnowdrop.addHandle(async () => {
      await this.update()

      if (this.status === OrderRequestStatus.FILLED || this.status === OrderRequestStatus.CANCELLED) {
        struct.bellflower.blockIndexSnowdrop.removeHandleById(handleId)
      }
    })

    this.loopBroadcast()
  }

  async fetchIsFilled(): Promise<boolean> {
    const cumulativeFill = await this.fetchCumulativeFill()
    if (cumulativeFill.compEq(this.getTokenLimit())) {
      return true
    }
    return false
  }

  private getTokenLimit(): Uint256 {
    if (this.tokenLimit) {
      return this.tokenLimit
    }
    const variTokenLimit = new Uint256(this.struct.variTokenLimit)
    if (this.struct.direction === OrderDirection.BUYY) {
      this.tokenLimit = variTokenLimit.opMul(this.struct.priceNumer)
    } else {
      this.tokenLimit = variTokenLimit
    }
    return this.tokenLimit
  }


  private async fetchSignedOrder(latestBlockNumber: Uintable ): Promise<SignedOrder> {

    const expiration = calcOrderExpiration({
      ...this.struct,
      latestBlockNumber,
    })
    const expirationNumberString = expiration.toNumberString(10)

    if (this.signedOrdersByExpirationNumberString[expirationNumberString] !== undefined) {
      return this.signedOrdersByExpirationNumberString[expirationNumberString]
    }

    const cumulativeFill = await this.fetchCumulativeFill()

    const order = new Order({
      ...this.struct,
      variToken: await this.struct.market.getBopManager(this.struct.bopType).fetchBop(),
      tokenLimit: this.getTokenLimit().opSub(cumulativeFill),
      expiration
    })
    const signature = this.struct.keypair.getSignature(order.getSugmaHash())
    const signedOrder = new SignedOrder({ order, signature })

    this.signedOrdersByExpirationNumberString[expirationNumberString] = signedOrder
    this.latestSignedOrder = signedOrder

    return signedOrder
  }

  async update() {
    this.setCumulativeFill(await this.fetchCumulativeFill())
    this.setVariTokenCumulativeFill(await this.fetchVariTokenCumulativeFill())
    if (await this.fetchIsFilled()) {
      this.setStatus(OrderRequestStatus.FILLED)
    }
  }

  private async setCumulativeFill(cumulativeFill: Uint256) {
    if (this.cumulativeFill !== null && this.cumulativeFill.compEq(cumulativeFill)) {
      return
    }
    this.cumulativeFill = cumulativeFill
    this.cumulativeFillSnowdrop.emit(cumulativeFill)
  }

  private async setVariTokenCumulativeFill(variTokenCumulativeFill: Uint256) {
    if (this.variTokenCumulativeFill !== null && this.variTokenCumulativeFill.compEq(variTokenCumulativeFill)) {
      return
    }
    this.variTokenCumulativeFill = variTokenCumulativeFill
    this.variTokenCumulativeFillSnowdrop.emit(variTokenCumulativeFill)
  }

  private setStatus(status: OrderRequestStatus) {
    console.log('setStatus', status)
    if (this.status === status) {
      return
    }
    this.status = status
    this.statusSnowdrop.emit(status)
  }

  private async fetchCumulativeFill(): Promise<Uint256> {
    const blockIndex = await this.struct.bellflower.fetchLatestBlockIndex()
    const blockIndexNumberString = blockIndex.toNumberString(10)
    if (this.cumulativeFillPromisesByBlockIndexNumberString[blockIndexNumberString]) {
      return this.cumulativeFillPromisesByBlockIndexNumberString[blockIndexNumberString]
    }

    const cumulativeFillPromise: Promise<Uint256> = new Promise<Uint256>(async (resolve) => {
      let cumulativeFill: Uint256 = new Uint256(0)
      const expirationNumberStrings = Object.keys(this.signedOrdersByExpirationNumberString)
      for (let i = 0; i < expirationNumberStrings.length; i++) {
        const expirationNumberString = expirationNumberStrings[i]
        const signedOrder = await this.signedOrdersByExpirationNumberString[expirationNumberString]
        const fill = await this.struct.engineReader.fetchFill(signedOrder.getSignatureHash())
        cumulativeFill = cumulativeFill.opAdd(fill)
      }
      resolve(cumulativeFill)
    })

    this.cumulativeFillPromisesByBlockIndexNumberString[blockIndexNumberString] = cumulativeFillPromise
    return cumulativeFillPromise
  }

  async fetchVariTokenCumulativeFill(): Promise<Uint256> {
    const cumulativeFill = await this.fetchCumulativeFill()
    return this.struct.direction === OrderDirection.BUYY ?
      cumulativeFill.opDiv(this.struct.priceNumer)
      : cumulativeFill
  }

  cancel() {
    if (this.status !== OrderRequestStatus.OPEN) {
      throw new Error('Can only cancel when open')
    }
    this.setStatus(OrderRequestStatus.CANCELLING)
    const handleId = this.struct.bellflower.blockIndexSnowdrop.addHandle((blockIndex) => {
      if (blockIndex.compLte(this.latestSignedOrder.expiration)) {
        return
      }
      this.struct.bellflower.blockIndexSnowdrop.removeHandleById(handleId)

      if (this.status === OrderRequestStatus.CANCELLING) {
        this.setStatus(OrderRequestStatus.CANCELLED)
      }
    })
  }

  getStatus(): OrderRequestStatus {
    return this.status
  }

  private async loopBroadcast() {
    console.log('loop broadcast')

    await this.update()

    if (this.status !== OrderRequestStatus.OPEN) {
      return
    }
    const signedOrder = await this.fetchSignedOrder(
      await this.struct.bellflower.fetchLatestBlockIndex()
    )
    const missiveGenerator = new MissiveGenerator({
      applicationId: this.struct.applicationId,
      applicationData: signedOrder.getLigma(),
      difficulty: 1,
      ttl: 30,
      hashcashWorkerUrl: '/hashcash-worker.js'
    })
    this.struct.anemoneClient.broadcastMissive(await missiveGenerator.fetchMissive())
    await delay(1000)
    this.loopBroadcast()
  }

}
