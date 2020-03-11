import { Snowdrop } from 'pollenium-snowdrop'
import * as React from 'react'
import { AccountsComponent } from '../components/Accounts'
import { DaiManagerComponent } from '../components/DaiManager'

export interface ModalStruct {
  title: string | null,
  mainElement: JSX.Element
}

export class ModalManager {

  readonly modalStructSnowdrop = new Snowdrop<ModalStruct>()

  private accountsElement: JSX.Element | null = null
  private daiManagerElement: JSX.Element | null = null

  constructor() {
  }

  openAccounts() {
    this.modalStructSnowdrop.emit({
      title: 'Accounts Manager',
      mainElement: this.getAccountsElement()
    })
  }

  openDaiManager() {
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
