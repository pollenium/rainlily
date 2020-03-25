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
  onAmount: (amount: Uint256 | null) => void,
  amountInSnowdrop?: Snowdrop<Uintable | null>
}

const validates: InputGroupValidates = [
  async (amountString: string) => {
    if (Number.isNaN(Number(amountString))) {
      return 'Not a valid number'
    }
    return null
  },
  async (amountString: string) => {
    if (!Number.isInteger(parseFloat(amountString))) {
      return 'Must be a whole number'
    }
    return null
  },
  async (amountString: string) => {
    if (parseFloat(amountString) < 0) {
      return 'Cannot be negative'
    }
    return null
  },
  async (amountString: string) => {
    if (parseFloat(amountString) === 0) {
      return 'Cannot be zero'
    }
    return null
  }
]

export class AmountInputGroupComponent extends React.Component<DaiInputGroupProps> {

  private readonly valueInSnowdrop = new Snowdrop<string | null>()

  constructor(props) {
    super(props)
    this.state = {}
    if (props.amountInSnowdrop) {
      props.amountInSnowdrop.addHandle((amount) => {
        if (amount === null) {
          this.valueInSnowdrop.emit(null)
        } else {
          const amountBignumber = new Bignumber(new Uint256(amount).toNumberString(10))
          this.valueInSnowdrop.emit(amountBignumber.div(e18Bignumber).toString())
        }
      })
    }
  }

  render() {
    return (<InputGroupComponent
      { ...this.props }
      type='text'
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
      this.props.onAmount(null)
      return
    }
    const amount = Uint256.fromNumberString(10, value)
    this.props.onAmount(amount)
  }

}
