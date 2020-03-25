import { Snowdrop } from 'pollenium-snowdrop'
import * as React from 'react'
import { AccountsComponent } from '../components/Accounts'
import { DaiManagerComponent } from '../components/DaiManager'

export enum ModalId {
  ACCOUNTS = 'accounts',
  DAI = 'dai'
}

export interface ModalStruct {
  title: string | null,
  mainElement: JSX.Element
}

export class ModalManager {

  readonly modalIdSnowdrop = new Snowdrop<ModalId | null>()
  readonly modalStructSnowdrop = new Snowdrop<ModalStruct>()
  readonly modalCloseSnowdrop = new Snowdrop<void>()

  private accountsElement: JSX.Element | null = null
  private daiManagerElement: JSX.Element | null = null

  constructor() {
    this.modalCloseSnowdrop.addHandle(() => {
      this.modalIdSnowdrop.emit(null)
    })
  }

  openAccounts() {
    this.modalIdSnowdrop.emit(ModalId.ACCOUNTS)
    this.modalStructSnowdrop.emit({
      title: 'Accounts Manager',
      mainElement: this.getAccountsElement()
    })
  }

  openDaiManager() {
    this.modalIdSnowdrop.emit(ModalId.DAI)
    this.modalStructSnowdrop.emit({
      title: 'Dai Manager',
      mainElement: this.getDaiManagerElement()
    })
  }

  getAccountsElement(): JSX.Element {
    if (this.accountsElement === null) {
      this.accountsElement = <AccountsComponent />
    }
    return this.accountsElement
  }

  getDaiManagerElement(): JSX.Element {
    if (this.daiManagerElement === null) {
      this.daiManagerElement = <DaiManagerComponent />
    }
    return this.daiManagerElement
  }

}
