import * as React from 'react'
import { OptionsComponent, OptionStruct } from '../Options'
import { DividerComponent } from '../Divider'
import { MarketOverviewComponent } from '../MarketOverview'
import { MarketBalancesComponent } from '../MarketBalances'
import { MarketTradeComponent } from '../MarketTrade'
import { MarketOrderRequestsComponent } from '../MarketOrderRequests'
import { MarketMintComponent } from '../MarketMint'
import { Market } from '../../lib/Market'

enum SectionName {
  OVERVIEW = 'overview',
  MARKET   = 'market',
  TRADE    = 'trade',
  BALANCES = 'balances',
  ORDERS = 'orders',
  MINT = 'mint'
}

export class MarketComponent extends React.Component<{ market: Market }, { sectionName: SectionName }> {

  constructor(props) {
    super(props)
    this.state = { sectionName: SectionName.OVERVIEW }
  }

  render() {

    const optionStructs: OptionStruct[] = [{
      id: SectionName.OVERVIEW,
      main: 'Overview',
      onSelect: () => {
        this.setState({ sectionName: SectionName.OVERVIEW })
      }
    }, {
      id: SectionName.MARKET,
      main: 'Market',
      onSelect: () => {
        this.setState({ sectionName: SectionName.MARKET })
      }
    }, {
      id: SectionName.TRADE,
      main: 'Buy/Sell',
      onSelect: () => {
        this.setState({ sectionName: SectionName.TRADE })
      }
    }, {
      id: SectionName.ORDERS,
      main: 'Orders',
      onSelect: () => {
        this.setState({ sectionName: SectionName.ORDERS })
      }
    }, {
      id: SectionName.MINT,
      main: 'Mint',
      onSelect: () => {
        this.setState({ sectionName: SectionName.MINT })
      }
    }]

    const section = this.getSection()

    return (
      <div className="full flex-rows bg-dark">
        <div className="flex-no-change">
          <div className="pad">
            <OptionsComponent
              optionStructs={ optionStructs }
              optionId={ SectionName.OVERVIEW }/>
          </div>
          <DividerComponent/>
        </div>
        <div className="flex-shrink overflow-y-scroll">{ this.getSection() }</div>
      </div>
    )
  }

  getSection(): JSX.Element {
    switch(this.state.sectionName) {
      case SectionName.OVERVIEW:
        return (
          <MarketOverviewComponent market={ this.props.market }/>
        )
      case SectionName.TRADE:
        return (
          <MarketTradeComponent market={ this.props.market }/>
        )
      case SectionName.BALANCES:
        return (
          <MarketBalancesComponent market={ this.props.market }/>
        )
      case SectionName.ORDERS:
        return (
          <MarketOrderRequestsComponent market={ this.props.market }/>
        )
      case SectionName.MINT:
        return (
          <MarketMintComponent market={ this.props.market }/>
        )
      default:
        return (
          <div className="container">{ this.state.sectionName }</div>
        )
    }
  }
}
