import { Uint256 } from 'pollenium-buttercup'
import classNames from 'classnames'
import Bignumber from 'bignumber.js'
import * as React from 'react'
import { e18Bignumber } from '../../globals/e18Bignumber'
import { LinearIconComponent } from '../LinearIcon'


export class DaiComponent extends React.Component<{ attodai: Uint256 | null }, { isExpanded: boolean }> {

  constructor(props) {
    super(props)
    this.state = { isExpanded: false }
  }

  render() {
    if (this.props.attodai === null) {
      return <span>$-.--</span>
    }

    const attodaiBignumber = new Bignumber(this.props.attodai.toNumberString(10))
    const daiBignumber = attodaiBignumber.div(e18Bignumber)

    const daiShort = daiBignumber.toFixed(2, Bignumber.ROUND_DOWN)
    const daiLong = daiBignumber.toString()

    if (daiShort.length >= daiLong.length) {
      return <span>${ daiShort }</span>
    }

    return (
      <span
        onMouseEnter={ this.onMouseEnter.bind(this) }
        onMouseLeave={ this.onMouseLeave.bind(this) }>
        ${ !this.state.isExpanded
          ? `${daiShort}…`
          : daiLong
        }
      </span>
    )
  }

  onMouseEnter() {
    this.setState({ isExpanded: true })
  }

  onMouseLeave() {
    this.setState({ isExpanded: false })
  }
}
