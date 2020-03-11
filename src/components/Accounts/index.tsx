import * as React from 'react'
import { Account } from '../../classes/Account'
import { DividerComponent } from '../Divider'
import { LinearIconComponent } from '../LinearIcon'
import { SquareSmallComponent } from '../SquareSmall'
import { AuthComponent } from '../Auth'
import { accountsManager } from '../../globals/accountsManager'
import classNames from 'classnames'
import './index.scss'

class AccountComponent extends React.Component<{ account: Account, isAccount: boolean}> {
  render() {
    return (<div className="flex-columns">
      <div className="flex-grow flex-shrink overflow-ellipsis pad-small-vertical">
        { this.props.account.keypair.getAddress().uu.toHex()}
      </div>
      <div><SquareSmallComponent/></div>
      <div
        className="pad-small-vertical text-brighter-on-hover cursor-pointer"
        onClick={ this.setAccount.bind(this) }
        style={{ color: this.props.isAccount ? 'white' : ''}}>
        { this.getSetAccountElement() }
      </div>
      <div><SquareSmallComponent/></div>
      <a
        className="pad-small-vertical cursor-pointer text-brighter-on-hover"
        href={ this.props.account.getLinkUrl() }
        target="_blank"
        >
        <LinearIconComponent icon="file-search"/>
      </a>
      <div><SquareSmallComponent/></div>
      <div className="pad-small-vertical cursor-pointer text-brighter-on-hover" onClick={ this.removeAccount.bind(this) }>
        <LinearIconComponent icon="cross"/>
      </div>
    </div>)
  }

  getSetAccountElement(): JSX.Element {
    return (<div>
      <LinearIconComponent icon="check"/>
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
    return (<div className="pad-horizontal-if-narrow border-bottom">
      <div className="pad-top text-large">My Accounts</div>
      <div className="pad-vertical">{ accountElements }</div>
    </div>)
  }

  private getAddAccountElement(): JSX.Element {
    return (<div className="pad-vertical">
      <div className="text-large pad-horizontal-if-narrow">Add New Account</div>
      <div><AuthComponent /></div>
    </div>)
  }
}
