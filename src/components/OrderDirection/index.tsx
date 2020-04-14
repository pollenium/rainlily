import * as React from 'react'
import { OrderDirection } from 'pollenium-alchemilla'

export class OrderDirectionComponent extends React.Component<{
  orderDirection: OrderDirection
}> {
  render() {
    return (<span>
      { this.props.orderDirection === OrderDirection.BUYY ? 'Buy' : 'Sell' }
    </span>)
  }
}
