import { CentipriceComponent } from '../Centiprice'
import * as React from 'react'

export class CentipricesComponent extends React.Component<{
  buyyCentiprice: number | null,
  sellCentiprice: number | null
}> {
  render() {
    return (
      <span>
        <CentipriceComponent centiprice={ this.props.buyyCentiprice} />
        <span className="pad-small-horizontal text-muted">-</span>
        <CentipriceComponent centiprice={ this.props.sellCentiprice} />
      </span>
    )
  }
}
