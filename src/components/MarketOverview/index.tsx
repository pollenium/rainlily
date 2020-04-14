import * as React from 'react'
import { OptionsComponent, OptionStruct } from '../Options'
import { DividerComponent } from '../Divider'
import { ButtonComponent } from '../Button'
import { Market } from '../../classes/Market'
import { BopManager } from '../../classes/BopManager'
import { DaiComponent } from '../Dai'
import { BopTypeComponent } from '../BopType'
import { BopPricesComponent } from '../BopPrices'
import { BopType } from '../../BopType'
import { Account } from '../../classes/Account'
import { Uint256 } from 'pollenium-buttercup'
import { accountsManager } from '../../globals/accountsManager'
import './index.scss'

class BopOverview extends React.Component<
  { bopManager: BopManager },
  { account: Account | null, balance: Uint256 | null }
> {

  private accountHandleId: number | null = null
  private balanceHandleId: number | null = null

  constructor(props) {
    super(props)
    this.state = { account: accountsManager.getAccount(), balance: null }
  }

  async componentWillMount() {
    this.accountHandleId = accountsManager.accountSnowdrop.addHandle(async (account) => {
      this.setState({ account })
    })

    const bop = await this.props.bopManager.fetchBop()
    const balance = await accountsManager.fetchEngineBalance(bop)
    this.setState({ balance })

    this.balanceHandleId = accountsManager.getEngineBalanceSnowdrop(bop).addHandle((balance) => {
      this.setState({ balance })
    })
  }

  async componentWillUnmount() {
    if (this.accountHandleId !== null) {
      accountsManager.accountSnowdrop.removeHandleById(this.accountHandleId)
      this.accountHandleId = null
    }

    if (this.balanceHandleId !== null) {
      const bop = await this.props.bopManager.fetchBop()
      accountsManager.getEngineBalanceSnowdrop(bop).removeHandleById(this.balanceHandleId)
      this.balanceHandleId = null
    }
  }

  render() {
    return (<div>
      <div className="text-large text-center">
        <BopTypeComponent bopType={ this.props.bopManager.bopType }/>
      </div>
      { this.getBalanceElement() }
      <div className="pad-vertical text-center">
        <BopPricesComponent bopManager={ this.props.bopManager }/>
      </div>
      <div className="text-center">
        <ButtonComponent main="Buy/Sell" />
      </div>
    </div>)
  }

  getBalanceElement(): JSX.Element {
    if (this.state.account === null) {
      return null
    }
    return (<div className="pad-small-top text-center">
      Balance: { this.state.balance === null ? '-' : this.state.balance.toNumberString(10) }
    </div>)
  }
}

export class MarketOverviewComponent extends React.Component<
  { market: Market },
  {
    bopAgreeBuyyCentiprice: number | null,
    bopAgreeSellCentiprice: number | null,
    bopDisagreeBuyyCentiprice: number | null,
    bopDisagreeSellCentiprice: number | null
  }
> {

  constructor(props) {
    super(props)
    this.state = {
      bopAgreeBuyyCentiprice: null,
      bopAgreeSellCentiprice: null,
      bopDisagreeBuyyCentiprice: null,
      bopDisagreeSellCentiprice: null
    }
  }

  render() {
    return (
      <div className="overview container pad-vertical">
        <div className="flex-columns pad-bottom">
          <div style={{ width: '50%' }}>
            <BopOverview bopManager={ this.props.market.bopAgreeManager } />
          </div>
          <div className="flex-grow">
            <BopOverview bopManager={ this.props.market.bopDisagreeManager } />
          </div>
        </div>
        <DividerComponent/>
        <div className="explanation pad">
          <p>The individual identified in the question shall be the winner of the 2020 U.S. presidential general election.</p>
          <p>PredictIt may determine how and when to settle the market based on all information available to PredictIt at the relevant time.</p>
          <p>PredictIt reserves the right to wait for further official, party, judicial or other relevant announcements, reports or decisions to resolve any ambiguity or uncertainty before the market is settled. Markets may stay open or incur a delay in settlement well past the date of the contest in certain circumstances. If there is any change to an event, or any situation arises, that is not in PredictIt’s view addressed adequately by the market rules, PredictIt will decide the fairest and most appropriate course of action.</p>
          <p>PredictIt’s decisions and determinations under this rule shall be at PredictIt’s sole discretion and shall be final.</p>
          <p>End Date: N/A</p>
        </div>
      </div>
    )
  }

}
