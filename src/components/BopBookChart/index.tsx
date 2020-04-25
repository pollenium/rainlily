import * as React from 'react'
import { OptionsComponent, OptionStruct } from '../Options'
import { DividerComponent } from '../Divider'
import { ButtonComponent } from '../Button'
import { Market } from '../../lib/Market'
import { BopManager } from '../../lib/BopManager'
import { VolumePercentsByCents } from '../../lib/VolumePercentsByCents'
import { DaiComponent } from '../Dai'
import { BopTypeComponent } from '../BopType'
import { BopPricesComponent } from '../BopPrices'
import { BopType } from '../../BopType'
import { Account } from '../../lib/Account'
import { Uint256 } from 'pollenium-buttercup'
import { accountsManager } from '../../globals/accountsManager'
import './index.scss'

class ColumnComponent extends React.Component<{
  index: number,
  volumePercentsByCents: VolumePercentsByCents | null
}> {
  render() {
    return (<div className="flex-change flex-rows column">
      <div className="flex-grow"></div>
      { this.getColumnBuyy() }
      { this.getColumnSell() }
    </div>)
  }

  getBuyyPercent(): number {
    if (this.props.volumePercentsByCents === null) {
      return 0
    }
    return this.props.volumePercentsByCents[this.props.index].buyyPercent
  }

  getSellPercent(): number {
    if (this.props.volumePercentsByCents === null) {
      return 0
    }
    return this.props.volumePercentsByCents[this.props.index].sellPercent
  }

  getColumnBuyy(): JSX.Element | null {
    return (<div className="column-section column-section-buyy" style={{
      height: `${this.getBuyyPercent()}%`
    }}></div>)
  }

  getColumnSell(): JSX.Element | null {
    return (<div className="column-section column-section-sell" style={{
      height: `${this.getSellPercent()}%`
    }}></div>)
  }
}

export class BopBookChartComponent extends React.Component<
  { bopManager: BopManager },
  { volumePercentsByCents: VolumePercentsByCents | null }
> {

  constructor(props) {
    super(props)
    this.state = { volumePercentsByCents: null }
  }

  componentDidMount() {
    this.props.bopManager.cumulativeVolumePercentsByCentsSnowdrop.addHandle((volumePercentsByCents) => {
      this.setState({ volumePercentsByCents })
    })
  }

  render() {

    const columnComponents: JSX.Element[] = []

    for (let i = 0; i < 100; i++) {
      columnComponents.push(
        <ColumnComponent key={i} index={i} volumePercentsByCents={ this.state.volumePercentsByCents }/>
      )
    }

    return (<div className="flex-rows full overflow-hidden book-chart">
      <div className="flex-grow flex-columns">
        { columnComponents }
      </div>
      <div className="flex-columns text-small border-top">
        <div className="width-third">
          $0.00
        </div>
        <div className="width-third text-center">
          $0.50
        </div>
        <div className="width-third text-right">
          $1.00
        </div>
      </div>
    </div>)
  }
}
