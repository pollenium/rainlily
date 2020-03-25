import * as React from 'react'
import { Address, Uint256, Uintable } from 'pollenium-buttercup'
import { Uish, Uu } from 'pollenium-uvaursi'
import { MarketComponent } from '../components/Market'
import { OverseerReader, BopReader } from 'pollenium-honesty'
import { Primrose } from 'pollenium-primrose'
import { provider } from '../globals/provider'
import { anemoneClient } from '../globals/anemoneClient'
import { SignedOrder, ORDER_TYPE } from 'pollenium-alchemilla'
import { Snowdrop } from 'pollenium-snowdrop'
import Bignumber from 'bignumber.js'
import { dai, engine } from 'pollenium-xanthoceras'

const applicationId = Uu.fromUtf8('alchemilla.orders.v0').genPaddedLeft(32)
const e18 = new Bignumber(10).pow(18)

export enum BopType {
  AGREE = 'agree',
  DISAGREE = 'disagree'
}

interface CentipriceSnowdropPair {
  buyy: Snowdrop<number>
  sell: Snowdrop<number>
}


export interface BopManagerStruct {
  bopType: BopType,
  overseer: Uish
}

export class BopManager {

  readonly bopType: BopType
  readonly overseer: Address
  readonly overseerReader: OverseerReader

  private bopPrimrose: Primrose<Address>

  private centipriceSnowdropPairByBlockNumberString: {
    [blockNumberString: string]: CentipriceSnowdropPair
  } = {}

  constructor(readonly struct: BopManagerStruct) {
    this.bopType = struct.bopType
    this.overseer = new Address(struct.overseer)
    this.overseerReader = new OverseerReader({
      provider,
      address: this.overseer
    })

    anemoneClient.missiveSnowdrop.addHandle(async (missive) => {
      if (!missive.applicationId.uu.getIsEqual(applicationId)) {
        return
      }

      const signedOrder = SignedOrder.fromLigma(missive.applicationData)

      if (!signedOrder.quotToken.uu.getIsEqual(dai)) {
        return
      }

      const bop = await this.fetchBop()

      if (!signedOrder.variToken.uu.getIsEqual(bop)) {
        return
      }

      const centiprice =
        signedOrder
          .getPrice()
          .div(e18)
          .times(100)
          .integerValue(Bignumber.ROUND_HALF_CEIL)
          .toNumber()

      const centipriceSnowdropPair = this.getCentipriceSnowdropPair(signedOrder.blockNumber)

      if (signedOrder.type === ORDER_TYPE.BUYY) {
        centipriceSnowdropPair.buyy.emit(centiprice)
      } else {
        centipriceSnowdropPair.sell.emit(centiprice)
      }
    })
  }

  getCentipriceSnowdropPair(blockNumberUintable: Uintable): CentipriceSnowdropPair {
    const blockNumber = new Uint256(blockNumberUintable)
    const blockNumberString = blockNumber.toNumberString(10)
    if (this.centipriceSnowdropPairByBlockNumberString[blockNumberString] === undefined) {
      this.centipriceSnowdropPairByBlockNumberString[blockNumberString] = {
        buyy: new Snowdrop<number>(),
        sell: new Snowdrop<number>()
      }
    }
    return this.centipriceSnowdropPairByBlockNumberString[blockNumberString]
  }

  async fetchBop(): Promise<Address> {
    if (this.bopPrimrose) {
      return this.bopPrimrose.promise
    }
    this.bopPrimrose = new Primrose<Address>()

    if (this.bopType === BopType.AGREE) {
      const bop = await this.overseerReader.fetchBopAgree()
      this.bopPrimrose.resolve(bop)
    } else {
      const bop = await this.overseerReader.fetchBopDisagree()
      this.bopPrimrose.resolve(bop)
    }

    return this.bopPrimrose.promise
  }

}
