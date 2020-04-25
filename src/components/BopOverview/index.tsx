import * as React from 'react'
import { OptionsComponent, OptionStruct } from '../Options'
import { DividerComponent } from '../Divider'
import { ButtonComponent } from '../Button'
import { Market } from '../../lib/Market'
import { BopManager } from '../../lib/BopManager'
import { PriceRange } from '../../lib/PriceRange'
import { DaiComponent } from '../Dai'
import { BopTypeComponent } from '../BopType'
import { BopPricesComponent } from '../BopPrices'
import { BopType } from '../../BopType'
import { Account } from '../../lib/Account'
import { Uint256 } from 'pollenium-buttercup'
import { BopBookChartComponent } from '../BopBookChart'
import { accountsManager } from '../../globals/accountsManager'
import './index.scss'

export class BopOverviewComponent extends React.Component<
  { bopManager: BopManager },
  { account: Account | null, balance: Uint256 | null, priceRangeMin: Uint256 | null, priceRangeMax: Uint256 | null }
> {

  private accountHandleId: number | null = null
  private balanceHandleId: number | null = null
  private priceRangeHandleId: number | null = null

  constructor(props) {
    super(props)
    this.state = { account: accountsManager.getAccount(), balance: null, priceRangeMin: null, priceRangeMax: null }
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

    this.priceRangeHandleId = this.props.bopManager.priceRangeSnowdrop.addHandle((priceRange) => {
      this.setState({ priceRangeMin: priceRange.min , priceRangeMax: priceRange.max })
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
    return (<div className="pad-vertical">
      <div className="flex-columns">
        <div className="flex-no-change" style={{ width: 140 }}>
          <div className="pad-horizontal">
            <div className="text-large text-center">
              <BopTypeComponent bopType={ this.props.bopManager.bopType }/>
            </div>
            { this.getBalanceElement() }
            <div className="pad-top text-center">
              <DaiComponent attodai={ this.state.priceRangeMin }/>
              -
              <DaiComponent attodai={ this.state.priceRangeMax }/>
            </div>
          </div>
        </div>
        <div className="flex-grow overflow-hidden">
          <div className="pad-horizontal">
            <BopBookChartComponent bopManager={ this.props.bopManager }/>
          </div>
        </div>
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
