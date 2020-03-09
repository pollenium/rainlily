import * as React from 'react'
import { Address } from 'pollenium-buttercup'
import { Uish, Uu } from 'pollenium-uvaursi'
import { MarketComponent } from '../components/Market'
import { BopManager, BopType } from './BopManager'

export interface MarketStruct {
  name: string,
  imageFileName: string,
  overseer: Uish
}

export class Market {

  readonly id: string
  readonly name: string
  readonly imageFileName: string
  readonly imageUrl: string
  readonly overseer: Address

  readonly bopAgreeManager: BopManager
  readonly bopDisagreeManager: BopManager

  private element: JSX.Element

  constructor(readonly struct: MarketStruct) {
    this.name = struct.name
    this.imageFileName = struct.imageFileName
    this.imageUrl = `./media/market-images/${struct.imageFileName}`
    this.overseer = new Address(struct.overseer)
    this.id = this.overseer.uu.toHex()

    this.bopAgreeManager = new BopManager({ ...struct, bopType: BopType.AGREE })
    this.bopDisagreeManager = new BopManager({ ...struct, bopType: BopType.DISAGREE })
  }

  getElement(): JSX.Element {
    if (this.element) {
      return this.element
    }
    this.element = (<MarketComponent market={ this }/>)
    return this.element
  }


}
