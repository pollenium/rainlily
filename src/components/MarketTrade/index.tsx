import * as React from 'react'
import Bignumber from 'bignumber.js'
import { OptionStruct } from '../Options'
import { PromptComponent } from '../Prompt'
import { DividerComponent } from '../Divider'
import { ButtonComponent } from '../Button'
import { Market } from '../../lib/Market'
import { BopManager } from '../../lib/BopManager'
import { BopTypeComponent } from '../BopType'
import { OrderDirectionComponent } from '../OrderDirection'
import { AuthComponent } from '../Auth'
import { SquareComponent } from '../Square'
import { DaiInputGroupComponent } from '../DaiInputGroup'
import { AmountInputGroupComponent } from '../AmountInputGroup'
import { ErrorMessageComponent } from '../ErrorMessage'
import { DaiComponent } from '../Dai'
import { Uint256 } from 'pollenium-buttercup'
import { Account } from '../../lib/Account'
import { OrderDirection } from 'pollenium-alchemilla'
import { OrderRequestsManager } from '../../lib/OrderRequestsManager'
import { Theme } from '../../Theme'
import { BopType } from '../../BopType'
import { dai } from 'pollenium-xanthoceras'
import { accountsManager } from '../../globals/accountsManager'
import { notificationsManager } from '../../globals/notificationsManager'
import { bellflower } from '../../globals/bellflower'
import { engineReader } from '../../globals/engineReader'
import { anemoneClient } from '../../globals/anemoneClient'
import { applicationId } from '../../globals/applicationId'
import { e18Bignumber } from '../../globals/e18Bignumber'
import { orderRequestsManager } from '../../globals/orderRequestsManager'
import './index.scss'

export class MarketTradeComponent extends React.Component<
  { market: Market },
  {
    orderDirection: OrderDirection | null,
    bopType: BopType | null
    variTokenLimit: Uint256 | null,
    priceNumer: Uint256 | null,
    errorMessage: string | JSX.Element | null,
    isSubmittable: boolean
  }
> {
  constructor(props) {
    super(props)
    this.state = {
      orderDirection: null,
      bopType: null,
      variTokenLimit: null,
      priceNumer: null,
      isSubmittable: false,
      errorMessage: null
    }
  }

  render() {
    const orderDirectionOptionStructs: OptionStruct[] = [
      { id: OrderDirection.BUYY.toString(), main: 'Buy', onSelect: () => { this.setState({ orderDirection: OrderDirection.BUYY }) } },
      { id: OrderDirection.SELL.toString(), main: 'Sell', onSelect: () => { this.setState({ orderDirection: OrderDirection.SELL }) } }
    ]
    const bopOptionStructs: OptionStruct[] = [
      { id: BopType.AGREE, main: <BopTypeComponent bopType={ BopType.AGREE }/>, onSelect: () => { this.setState({ bopType: BopType.AGREE }) } },
      { id: BopType.DISAGREE, main: <BopTypeComponent bopType={ BopType.DISAGREE }/>, onSelect: () => { this.setState({ bopType: BopType.DISAGREE }) } }
    ]

    return (<form onSubmit={ this.onSubmit.bind(this) }>
      <SquareComponent/>
        <PromptComponent
          label="Would you like to Buy or Sell?"
          optionStructs={orderDirectionOptionStructs}/>
        {
          this.state.orderDirection === null ? null : (
            <div>
              <SquareComponent/>
              <PromptComponent
                label={(<span>
                  What would you like to <OrderDirectionComponent orderDirection={ this.state.orderDirection }/>?
                </span>)}
                optionId={ this.state.bopType }
                optionStructs={bopOptionStructs}/>
              {
                this.state.bopType === null ? null : (
                  <div>
                    <SquareComponent/>
                    <AmountInputGroupComponent
                      label={(<span>
                        How many <BopTypeComponent bopType={ this.state.bopType }/> would you like to <OrderDirectionComponent orderDirection={ this.state.orderDirection }/>
                      </span>)}
                      onAmount={ this.onAmount.bind(this) }
                      />
                    <SquareComponent/>
                    <DaiInputGroupComponent
                      label={ <span>How much Dai for each <BopTypeComponent bopType={ this.state.bopType } isSingular={ true }/>?</span> }
                      onAttodai={ this.onPriceNumer.bind(this) }
                      validates={ [async (daiString) => {
                        const daiBignumber = new Bignumber(daiString)
                        if (daiBignumber.gte(1)) {
                          return 'Must be less than $1.00'
                        }
                        if (daiBignumber.lte(0)) {
                          return 'Must be greater than $0.00'
                        }

                        const attodaiBignumber = daiBignumber.times(e18Bignumber)

                        if (attodaiBignumber.mod(1).gt(0)) {
                          return 'Too many decimal places'
                        }
                        return null
                      }] }
                      />
                    <SquareComponent/>
                    <ErrorMessageComponent errorMessage={ this.state.errorMessage }/>
                    <div className="text-right">
                      <ButtonComponent
                        icon="plus-circle"
                        main="Create Order"
                        isDisabled={ !this.state.isSubmittable }
                      />
                    </div>
                  </div>
                )
              }
            </div>
          )
        }
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

  async onSubmit(event) {
    event.preventDefault()
    notificationsManager.queueNotification({
      theme: Theme.INFO,
      main: 'Order created'
    })

    orderRequestsManager.genOrderRequest({
      market: this.props.market,
      bopType: this.state.bopType,
      keypair: accountsManager.getAccount().keypair,
      direction: this.state.orderDirection,
      quotToken: dai,
      variTokenLimit: this.state.variTokenLimit,
      priceNumer: this.state.priceNumer,
      priceDenom: 1
    })

    this.setState({
      orderDirection: null,
      bopType: null,
      variTokenLimit: null,
      priceNumer: null
    })

    // orderRequestsManager.addOrderRequest(orderRequest)
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      this.state.orderDirection !== nextState.orderDirection
      || this.state.bopType !== nextState.bopType
      || this.state.variTokenLimit !== nextState.variTokenLimit
      || this.state.priceNumer !== nextState.priceNumer
    ) {
      nextState.errorMessage = null
      nextState.isSubmittable = false
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.orderDirection === prevState.orderDirection
      && this.state.bopType === prevState.bopType
      && this.state.variTokenLimit === prevState.variTokenLimit
      && this.state.priceNumer === prevState.priceNumer
    ) {
      return
    }

    if (
      this.state.orderDirection === OrderDirection.SELL
      && this.state.bopType !== null
      && this.state.variTokenLimit !== null
    ) {
      const bop = await this.props.market.getBopManager(this.state.bopType).fetchBop()
      const balance = await accountsManager.fetchEngineBalance(bop)
      if (balance.compLt(this.state.variTokenLimit)) {
        this.setState({
          errorMessage: (<span>
            Cannot sell { this.state.variTokenLimit.toNumberString(10) } <BopTypeComponent bopType={ this.state.bopType }/>, { balance.toNumberString(10) } <BopTypeComponent bopType={ this.state.bopType }/> are available.
          </span>)
        })
        return
      }
    }

    if (
      this.state.orderDirection === OrderDirection.BUYY
      && this.state.bopType !== null
      && this.state.variTokenLimit !== null
      && this.state.priceNumer !== null
    ) {
      const totalAttodai = this.getTotalAttodai()
      const balance = await accountsManager.fetchEngineBalance(dai)
      if (balance.compLt(totalAttodai)) {
        this.setState({
          errorMessage: (<span>
            Total cost (<DaiComponent attodai={ totalAttodai } />) exceeds available (<DaiComponent attodai={ balance }/>).
          </span>)
        })
        return
      }
    }

    if (
      this.state.orderDirection !== null
      && this.state.bopType !== null
      && this.state.variTokenLimit !== null
      && this.state.priceNumer !== null
    ) {
      this.setState({ isSubmittable: true })
    }

  }

}
