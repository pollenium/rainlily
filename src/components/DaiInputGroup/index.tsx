import * as React from 'react'
import { LinearIconComponent } from '../LinearIcon'
import classNames from 'classnames'
import { InputGroupComponent, InputGroupProps, InputGroupValidates } from '../InputGroup'
import { Uint256, Uintable } from 'pollenium-buttercup'
import { e18Bignumber } from '../../globals/e18Bignumber'
import { Snowdrop } from 'pollenium-snowdrop'
import Bignumber from 'bignumber.js'

interface DaiInputGroupProps extends Pick<InputGroupProps, 'label'> {
  validates?: InputGroupValidates,
  onAttodai: (attodai: Uint256 | null) => void,
  attodaiInSnowdrop?: Snowdrop<Uintable | null>
}

const validates: InputGroupValidates = [
  async (amountString: string) => {
    if (Number.isNaN(Number(amountString))) {
      return 'Not a valid number'
    }
    return null
  },
  async (amountString: string) => {
    if (parseFloat(amountString) < 0) {
      return 'Cannot be negative'
    }
    return null
  }
]

export class DaiInputGroupComponent extends React.Component<DaiInputGroupProps> {

  private readonly valueInSnowdrop = new Snowdrop<string | null>()

  constructor(props) {
    super(props)
    this.state = {}
    if (props.attodaiInSnowdrop) {
      props.attodaiInSnowdrop.addHandle((attodai) => {
        if (attodai === null) {
          this.valueInSnowdrop.emit(null)
        } else {
          const attodaiBignumber = new Bignumber(new Uint256(attodai).toNumberString(10))
          this.valueInSnowdrop.emit(attodaiBignumber.div(e18Bignumber).toString())
        }
      })
    }
  }

  render() {
    return (<InputGroupComponent
      { ...this.props }
      type='text'
      prepend="$"
      validates={[
        ...validates,
        ...(this.props.validates ? this.props.validates : [])
      ]}
      onValue= { this.onValue.bind(this) }
      valueInSnowdrop={ this.valueInSnowdrop }
    />)
  }

  onValue(value: string | null) {
    if (value === null) {
      this.props.onAttodai(null)
      return
    }
    const attodaiBignumber = e18Bignumber.times(value)
    const attodai = Uint256.fromNumberString(10, attodaiBignumber.toString())
    this.props.onAttodai(attodai)
  }

}
