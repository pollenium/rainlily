import * as React from 'react'
import { OptionsComponent, OptionStruct } from '../Options'
import { DividerComponent } from '../Divider'
import { ButtonComponent } from '../Button'
import { Market } from '../../classes/Market'
import { AuthComponent } from '../Auth'
import { Address } from 'pollenium-buttercup'
import './index.scss'
import { Account } from '../../classes/Account'
import { accountsManager } from '../../globals/accountsManager'

export class MarketBalancesComponent extends React.Component<
  { market: Market },
  { account: Account | null }
> {

  constructor(props) {
    super(props)
    this.state = { account: accountsManager.getAccount() }

    accountsManager.accountSnowdrop.addHandle((account) => {
      this.setState({ account })
    })
  }

  render() {
    if (this.state.account === null) {
      return <AuthComponent/>
    }
    return (
      <div className="pad">Balances</div>
    )
  }

}