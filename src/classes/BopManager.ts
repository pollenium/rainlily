import * as React from 'react'
import { Address, Uint256, Uintable } from 'pollenium-buttercup'
import { Uish, Uu } from 'pollenium-uvaursi'
import { MarketComponent } from '../components/Market'
import { OverseerReader, BopReader } from 'pollenium-honesty'
import { Primrose } from 'pollenium-primrose'
import { provider } from '../globals/provider'
import { anemoneClient } from '../globals/anemoneClient'
import { SignedOrder, OrderDirection } from 'pollenium-alchemilla'
import { Snowdrop } from 'pollenium-snowdrop'
import Bignumber from 'bignumber.js'
import { BopType } from '../BopType'
import { dai, engine } from 'pollenium-xanthoceras'
import { applicationId } from '../globals/applicationId'

const e18 = new Bignumber(10).pow(18)


interface CentipriceSnowdropPair {
  buyy: Snowdrop<number>
  sell: Snowdrop<number>
}


export interface BopManagerStruct {
  bopType: BopType,
  overseer: Uish
}

interface Price {
  numer: Uint256,
  denom: Uint256,
  rounded: Uint256
}

export class BopManager {

  readonly bopType: BopType
  readonly overseer: Address
  readonly sellPriceSnowdrop = new Snowdrop<Price | null>()
  readonly buyyPriceSnowdrop = new Snowdrop<Price | null>()


  private overseerReader: OverseerReader
  private bopPrimrose: Primrose<Address>

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

      const price: Price = {
        numer: signedOrder.priceNumer,
        denom: signedOrder.priceDenom,
        rounded: signedOrder.priceNumer.opDiv(signedOrder.priceDenom)
      }

      if (signedOrder.direction === OrderDirection.BUYY) {
        this.buyyPriceSnowdrop.emit(price)
      } else {
        this.sellPriceSnowdrop.emit(price)
      }
    })
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
