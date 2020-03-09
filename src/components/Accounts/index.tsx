import * as React from 'react'
import { Account } from '../../classes/Account'
import { accountsManager } from '../../globals/accountsManager'
import './index.scss'

class AccountComponent extends React.Component<{ account: Account, isAccount: boolean}> {
  render() {
    return (<div className="flex-columns">
      <div>{ this.props.account.keypair.getAddress().uu.toHex()} </div>
    </div>)
  }
}


export class AccountsComponent extends React.Component<{}, {
  accounts: Account[],
  account: Account
}> {

  constructor(props) {
    super(props)
    this.state = {
      accounts: accountsManager.getAccounts(),
      account: accountsManager.getAccount()
    }
  }

  render() {
    return (
      <div>
        { this.getAccountsElement() }
      </div>
    )
  }

  private getAccountsElement(): JSX.Element {
    const accountElements = this.state.accounts.map((account) => {
      return <AccountComponent account={ account } isAccount={ account === this.state.account }/>
    })
    return (<div>{ accountElements} </div>)
  }
}
