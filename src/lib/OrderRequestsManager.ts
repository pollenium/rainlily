import { OrderStruct, Order, EngineReader, SignedOrder } from 'pollenium-alchemilla'
import { Snowdrop } from 'pollenium-snowdrop'
import { Client as AnemoneClient, MissiveGenerator } from 'pollenium-anemone'
import { Bellflower } from 'pollenium-bellflower'
import { Uu, Uish } from 'pollenium-uvaursi'
import { Bytes32, Address } from 'pollenium-buttercup'
import { Keypair } from 'pollenium-ilex'
import { Primrose } from 'pollenium-primrose'
import { calcOrderExpiration } from '../lib/calcOrderExpiration'
import { OrderRequestStruct, OrderRequest } from './OrderRequest'
import delay from 'delay'

interface OrderRequestsManagerStruct extends Pick<OrderRequestStruct, 'latency'|'anemoneClient'|'engineReader'|'applicationId'|'bellflower'> {
}

interface GenOrderRequestStruct extends Omit<OrderRequestStruct, 'latency'|'anemoneClient'|'engineReader'|'applicationId'|'bellflower'|'salt'|'originalBlockNumber'|'variToken'> {
}

export class OrderRequestsManager {

  private readonly bellflower: Bellflower
  private readonly saltPromise: Promise<Bytes32>

  readonly orderRequests: OrderRequest[] = []

  readonly genSnowdrop = new Snowdrop<void>()

  constructor(private readonly struct: OrderRequestsManagerStruct) {
    this.bellflower = struct.bellflower

    this.saltPromise = struct.engineReader.fetchOrderSalt()
  }

  async genOrderRequest(struct: GenOrderRequestStruct) {
    const orderRequest = new OrderRequest({
      ...this.struct,
      ...struct,
      salt: await this.saltPromise,
      originalBlockNumber: await this.bellflower.fetchLatestBlockIndex()
    })
    this.orderRequests.push(orderRequest)
    this.genSnowdrop.emit()
  }

}
