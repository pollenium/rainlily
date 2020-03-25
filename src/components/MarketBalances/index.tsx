import * as React from 'react'
import { OptionsComponent, OptionStruct } from '../Options'
import { DividerComponent } from '../Divider'
import { ButtonComponent } from '../Button'
import { Market } from '../../classes/Market'
import { BopManager } from '../../classes/BopManager'
import { AuthComponent } from '../Auth'
import { SquareComponent } from '../Square'
import { Uint256 } from 'pollenium-buttercup'
import './index.scss'
import { Account } from '../../classes/Account'
import { accountsManager } from '../../globals/accountsManager'

export class BopBalanceComponent extends React.Component<
  { bopManager: BopManager },
  { balance: Uint256 | null}
> {

  constructor(props) {
    super(props)
    this.state = { balance: null }
    this.linkEngineBalanceSnowdrop()
  }

  async linkEngineBalanceSnowdrop() {
    const bop = await this.props.bopManager.fetchBop()

    accountsManager.getEngineBalanceSnowdrop(bop).addHandle((balance) => {
      this.setState({ balance })
    })

    this.setState({
      balance: await accountsManager.fetchEngineBalance(bop)
    })

  }

  render() {
    if (this.state.balance === null) {
      return <div></div>
    }
    return <div>{ this.state.balance.toNumberString(0) }</div>
  }
}

export class MarketBalancesComponent extends React.Component<{ market: Market }> {

  render() {
    return (<div>
      <SquareComponent/>
      <div className="text-large">
        Agree Shares
      </div>
      <SquareComponent/>
      <BopBalanceComponent bopManager={ this.props.market.bopAgreeManager }/>
      <SquareComponent/>
      <DividerComponent/>
      <SquareComponent/>
      <div className="text-large">
        Disagree Shares
      </div>
    </div>)
  }

}
