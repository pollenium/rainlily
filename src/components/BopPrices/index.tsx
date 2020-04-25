import * as React from 'react'
import { BopManager } from '../../lib/BopManager'
import { DaiComponent } from '../Dai'
import { Uint256 } from 'pollenium-buttercup'
import { PriceRange } from '../../lib/PriceRange'

export class BopPricesComponent extends React.Component<
  { bopManager: BopManager },
  { priceRange: PriceRange | null }
> {

  private priceRangeHandleId: number | null = null

  constructor(props) {
    super(props)
    this.state = { priceRange: null }
  }

  componentWillMount() {
    this.priceRangeHandleId = this.props.bopManager.priceRangeSnowdrop.addHandle((priceRange) => {
      this.setState({ priceRange })
    })

  }

  componentWillUnmount() {
    if (this.priceRangeHandleId !== null) {
      this.props.bopManager.priceRangeSnowdrop.removeHandleById(this.priceRangeHandleId)
      this.priceRangeHandleId = null
    }
  }

  render() {
    return <span>
      <DaiComponent attodai={this.state.priceRange.min}/> - <DaiComponent attodai={this.state.priceRange.max}/>
    </span>
  }
}
