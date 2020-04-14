import * as React from 'react'
import { BopManager } from '../../classes/BopManager'
import { DaiComponent } from '../Dai'
import { Uint256 } from 'pollenium-buttercup'

export class BopPricesComponent extends React.Component<
  { bopManager: BopManager },
  {
    buyyPrice: Uint256 | null,
    sellPrice: Uint256 | null
  }
> {

  private buyyPriceHandleId: number | null = null
  private sellPriceHandleId: number | null = null

  constructor(props) {
    super(props)
    this.state = { buyyPrice: null, sellPrice: null }
  }

  componentWillMount() {
    this.buyyPriceHandleId = this.props.bopManager.buyyPriceSnowdrop.addHandle((price) => {
      this.setState({ buyyPrice: price.rounded })
    })

    this.sellPriceHandleId = this.props.bopManager.sellPriceSnowdrop.addHandle((price) => {
      this.setState({ sellPrice: price.rounded })
    })
  }

  componentWillUnmount() {
    if (this.buyyPriceHandleId !== null) {
      this.props.bopManager.buyyPriceSnowdrop.removeHandleById(this.buyyPriceHandleId)
      this.buyyPriceHandleId = null
    }

    if (this.sellPriceHandleId !== null) {
      this.props.bopManager.sellPriceSnowdrop.removeHandleById(this.sellPriceHandleId)
      this.sellPriceHandleId = null
    }
  }

  render() {
    return <span>
      <DaiComponent attodai={this.state.buyyPrice}/> - <DaiComponent attodai={this.state.sellPrice}/>
    </span>
  }
}
