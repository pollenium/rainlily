import { Snowdrop } from 'pollenium-snowdrop'
import * as React from 'react'
import { AccountsComponent } from '../components/Accounts'

export interface ModalStruct {
  title: string | null,
  mainElement: JSX.Element
}

export class ModalManager {

  readonly modalStructSnowdrop = new Snowdrop<ModalStruct>()

  private accountsElement: JSX.Element | null = null

  constructor() {
  }

  openAccounts() {
    this.modalStructSnowdrop.emit({
      title: 'Accounts',
      mainElement: this.getAccountsElement()
    })
  }

  getAccountsElement(): JSX.Element {
    if (this.accountsElement === null) {
      this.accountsElement = <AccountsComponent />
    }
    return this.accountsElement
  }

}
