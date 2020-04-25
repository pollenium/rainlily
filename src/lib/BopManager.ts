import * as React from 'react'
import { Address, Uint256, Uintable } from 'pollenium-buttercup'
import { Uish, Uu } from 'pollenium-uvaursi'
import { MarketComponent } from '../components/Market'
import { OverseerReader, BopReader } from 'pollenium-honesty'
import { Primrose } from 'pollenium-primrose'
import { provider } from '../globals/provider'
import { anemoneClient } from '../globals/anemoneClient'
import { bellflower } from '../globals/bellflower'
import { SignedOrder, OrderDirection } from 'pollenium-alchemilla'
import { Snowdrop } from 'pollenium-snowdrop'
import Bignumber from 'bignumber.js'
import { BopType } from '../BopType'
import { dai, engine } from 'pollenium-xanthoceras'
import { applicationId } from '../globals/applicationId'
import { e18 } from '../globals/e18'
import { getPriceRange } from './getPriceRange'
import { PriceRange } from './PriceRange'
import { VolumePercentsByCents } from './VolumePercentsByCents'
import { getCumulativeVolumePercentsByCents } from './getCumulativeVolumePercentsByCents'

console.log('applicationId', applicationId.uu.toUtf8())


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
  readonly priceRangeSnowdrop = new Snowdrop<PriceRange>()
  readonly cumulativeVolumePercentsByCentsSnowdrop = new Snowdrop<VolumePercentsByCents | null>()

  private overseerReader: OverseerReader
  private bopPrimrose: Primrose<Address>

  private signedOrders: SignedOrder[] = []

  constructor(readonly struct: BopManagerStruct) {
    this.bopType = struct.bopType
    this.overseer = new Address(struct.overseer)
    this.overseerReader = new OverseerReader({
      provider,
      address: this.overseer
    })

    bellflower.blockIndexSnowdrop.addHandle(() => {
      this.removeExpiredSignedOrders()
    })

    anemoneClient.missiveSnowdrop.addHandle(async (missive) => {

      console.log('missive received')

      if (!missive.applicationId.uu.getIsEqual(applicationId)) {
        return
      }

      const signedOrder = SignedOrder.fromLigma(missive.applicationData)

      this.handleSignedOrder(signedOrder)
    })

    this.updateCumulativeVolumePercentsByCents()
    this.updatePriceRange()
    setInterval(() => {
      this.updateCumulativeVolumePercentsByCents()
      this.updatePriceRange()
    }, 1000)
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

  private async handleSignedOrder(signedOrder: SignedOrder) {
    if (!signedOrder.quotToken.uu.getIsEqual(dai)) {
      return
    }

    const bop = await this.fetchBop()

    if (!signedOrder.variToken.uu.getIsEqual(bop)) {
      return
    }

    this.signedOrders.push(signedOrder)
  }


  private updateCumulativeVolumePercentsByCents() {
    const cumulativeVolumePercentsByCents = getCumulativeVolumePercentsByCents(this.signedOrders)
    this.cumulativeVolumePercentsByCentsSnowdrop.emit(cumulativeVolumePercentsByCents)
  }


  private async removeExpiredSignedOrders() {
    const blockIndex = await bellflower.fetchLatestBlockIndex()
    this.signedOrders = this.signedOrders.filter((signedOrder) => {
      return signedOrder.expiration.compGt(blockIndex)
    })
  }

  private getPriceRange(): PriceRange {
    return getPriceRange(this.signedOrders)
  }

  private updatePriceRange() {
    this.priceRangeSnowdrop.emit(this.getPriceRange())
  }
}
