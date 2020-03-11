import { Uint256 } from 'pollenium-buttercup'
import classNames from 'classnames'
import Bignumber from 'bignumber.js'
import * as React from 'react'

const e18Bignumber = new Bignumber(10).pow(18)

export class DaiComponent extends React.Component<{ attodai: Uint256 | null }> {

  render() {
    return (
      <span>{this.getDaiText()}</span>
    )
  }

  getDaiText(): string {

    if (this.props.attodai === null) {
      return '$-.--'
    }

    const attodaiBignumber = new Bignumber(this.props.attodai.toNumberString(10))
    const daiBignumber = attodaiBignumber.div(e18Bignumber)
    return `$${daiBignumber.toFixed(2)}`

  }
}
