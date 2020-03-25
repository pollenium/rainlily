import * as React from 'react'
import { OptionStruct } from '../Options'
import { PromptComponent } from '../Prompt'
import { DividerComponent } from '../Divider'
import { ButtonComponent } from '../Button'
import { Market } from '../../classes/Market'
import { BopManager } from '../../classes/BopManager'
import { BopComponent } from '../Bop'
import { AuthComponent } from '../Auth'
import { SquareComponent } from '../Square'
import { DaiInputGroupComponent } from '../DaiInputGroup'
import { AmountInputGroupComponent } from '../AmountInputGroup'
import { DaiComponent } from '../Dai'
import { Uint256 } from 'pollenium-buttercup'
import './index.scss'
import { Account } from '../../classes/Account'
import { accountsManager } from '../../globals/accountsManager'
import { notificationsManager } from '../../globals/notificationsManager'
import { Theme } from '../../Theme'

export class MarketTradeComponent extends React.Component<
  { market: Market },
  {
    direction: 'Buy' | 'Sell' | null,
    bopType: 'Agree' | 'Disagree' | null
    variTokenLimit: Uint256 | null,
    priceNumer: Uint256 | null
  }
> {
  constructor(props) {
    super(props)
    this.state = {
      direction: null,
      bopType: null,
      variTokenLimit: null,
      priceNumer: null
    }
  }

  render() {
    const directionOptionStructs: OptionStruct[] = [
      { id: 'Buy', main: 'Buy', onSelect: () => { this.setState({ direction: 'Buy' }) } },
      { id: 'Sell', main: 'Sell', onSelect: () => { this.setState({ direction: 'Sell' }) } }
    ]
    const bopOptionStructs: OptionStruct[] = [
      { id: 'Agree', main: <BopComponent type="Agree" isPlural={ true }/>, onSelect: () => { this.setState({ bopType: 'Agree' }) } },
      { id: 'Disagree', main: <BopComponent type="Disagree" isPlural={ true }/>, onSelect: () => { this.setState({ bopType: 'Disagree' }) } }
    ]

    return (<form onSubmit={ this.onSubmit.bind(this) }>
      <SquareComponent/>
      <div className="pad-horizontal">
        <PromptComponent
          label="Would you like to Buy or Sell?"
          optionId={ this.state.direction }
          optionStructs={directionOptionStructs}/>
        {
          this.state.direction === null ? null : (
            <div>
              <SquareComponent/>
              <PromptComponent
                label={ `What would you like to ${this.state.direction}?` }
                optionId={ this.state.bopType }
                optionStructs={bopOptionStructs}/>
              {
                this.state.bopType === null ? null : (
                  <div>
                    <SquareComponent/>
                    <AmountInputGroupComponent
                      label={ `How many ${this.state.bopType} would you like to ${this.state.direction}?` }
                      onAmount={ this.onAmount.bind(this) }
                      />
                    <SquareComponent/>
                    <DaiInputGroupComponent
                      label={ `How much Dai per ${this.state.bopType} Token?` }
                      onAttodai={ this.onPriceNumer.bind(this) }
                      validates={ [async (amountString) => {
                        if (parseFloat(amountString) >= 1) {
                          return 'Must be less than $1.00'
                        }
                        if (parseFloat(amountString) == 0) {
                          return 'Must be greater than $0.00'
                        }
                        return null
                      }] }
                      />
                    <SquareComponent/>
                    <div className="text-right">
                      <ButtonComponent
                        icon="plus-circle"
                        main={ this.getButtonMain() }
                        isDisabled={ !this.getIsSubmittable() }
                      />
                    </div>
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    </form>)
  }

  onAmount(variTokenLimit) {
    this.setState({ variTokenLimit })
  }

  onPriceNumer(priceNumer) {
    this.setState({ priceNumer })
  }

  getTotalAttodai(): Uint256 {
    return this.state.priceNumer.opMul(this.state.variTokenLimit)
  }

  getButtonMain(): JSX.Element | string {
    if (!this.getIsSubmittable()) {
      return 'Create Order'
    }
    return (<span>
      Create Order to { this.state.direction } up to {this.state.variTokenLimit.toNumberString(10)} {this.state.bopType} for <DaiComponent attodai={ this.getTotalAttodai() }/> total.
    </span>)

  }

  async onSubmit(event) {
    event.preventDefault()
    notificationsManager.queueNotification({
      theme: Theme.INFO,
      main: 'Order created'
    })

    // const orderRequest = new OrderRequest({
    //   orderType: this.state.direction === 'Buy' ? ORDER_TYPE.BUYY : ORDER_TYPE.SELL,
    //   quotToken: dai,
    //   variToken: this.state.bopType === 'Agree'
    //     ? await this.market.bopAgreeManager.fetchBop()
    //     : await this.market.bopDisagreeManager.fetchBop(),
    //   tokenLimit: this.state.direction ==== 'Buy'
    //     ? this.state.amount.opMul(this.state.priceNumer)
    //     : this.state.amount,
    //   priceNumer: this.state.priceNumer,
    //   priceDenom: 1
    // })

    this.setState({
      direction: null,
      bopType: null,
      variTokenLimit: null,
      priceNumer: null
    })

    // orderRequestsManager.addOrderRequest(orderRequest)
  }

  getIsSubmittable(): boolean {
    if (
      this.state.direction === null
      || this.state.bopType === null
      || this.state.variTokenLimit === null
      || this.state.priceNumer === null
    ) {
      return false
    } else {
      return true
    }
  }

  componentWillUpdate(nextProps, nextState) {

  }

}
