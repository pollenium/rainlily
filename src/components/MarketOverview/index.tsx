import * as React from 'react'
import { OptionsComponent, OptionStruct } from '../Options'
import { DividerComponent } from '../Divider'
import { ButtonComponent } from '../Button'
import { Market } from '../../lib/Market'
import { BopManager } from '../../lib/BopManager'
import { DaiComponent } from '../Dai'
import { BopTypeComponent } from '../BopType'
import { BopPricesComponent } from '../BopPrices'
import { BopType } from '../../BopType'
import { Account } from '../../lib/Account'
import { Uint256 } from 'pollenium-buttercup'
import { accountsManager } from '../../globals/accountsManager'
import { BopOverviewComponent } from '../BopOverview'
import './index.scss'

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
      <div className="overview container">
        <BopOverviewComponent bopManager={ this.props.market.bopAgreeManager } />
        <DividerComponent/>
        <BopOverviewComponent bopManager={ this.props.market.bopDisagreeManager } />
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
