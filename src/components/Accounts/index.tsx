import * as React from 'react'
import { Account } from '../../lib/Account'
import { DividerComponent } from '../Divider'
import { LinearIconComponent } from '../LinearIcon'
import { SquareComponent } from '../Square'
import { AuthComponent } from '../Auth'
import { accountsManager } from '../../globals/accountsManager'
import classNames from 'classnames'
import './index.scss'

class AccountComponent extends React.Component<{ account: Account, isAccount: boolean }> {
  render() {
    return (<div className="flex-columns">
      <div className="flex-grow flex-shrink overflow-ellipsis">
        { this.props.account.keypair.getAddress().uu.toHex()}
      </div>
      <div><SquareComponent/></div>
      <div>
        <span
          className="clickable"
          onClick={ this.setAccount.bind(this) }
          style={{ color: this.props.isAccount ? 'white' : ''}}>
            <LinearIconComponent icon={ this.props.isAccount ? 'check-square' : 'square' }/>
        </span>
        &nbsp;
        <span className="clickable" onClick={ this.removeAccount.bind(this) }>
          <LinearIconComponent icon="cross-square" align="right"/>
        </span>
      </div>
    </div>)
  }

  removeAccount() {
    if (!confirm('Remove this account?')) {
      return
    }
    accountsManager.removeAccount(this.props.account)
  }

  setAccount() {
    accountsManager.setAccount(this.props.account)
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

    accountsManager.accountSnowdrop.addHandle((account) => {
      this.setState({ account })
    })

    accountsManager.accountsSnowdrop.addHandle((accounts) => {
      this.setState({ accounts })
    })
  }

  render() {
    return (
      <div className="container">
        { this.getAccountsElement() }
        <DividerComponent/>
        { this.getAddAccountElement() }
      </div>
    )
  }

  private getAccountsElement(): JSX.Element {
    if (this.state.accounts.length === 0) {
      return null
    }

    const accountElements = this.state.accounts.map((account) => {
      return <AccountComponent
        key={ account.keypair.getAddress().uu.toHex() }
        account={ account }
        isAccount={ account === this.state.account }/>
    })
    return (<div className="pad-horizontal-if-narrow">
      <SquareComponent/>
      <div className="text-large">My Accounts</div>
      <SquareComponent/>
      { accountElements }
      <SquareComponent/>
    </div>)
  }

  private getAddAccountElement(): JSX.Element {
    return (<div className="pad-horizontal-if-narrow">
      <SquareComponent/>
      <div className="text-large">Add New Account</div>
      <SquareComponent/>
      <AuthComponent />
    </div>)
  }
}
