import * as React from 'react'
import { LinearIconComponent } from '../LinearIcon'
import classNames from 'classnames'
import { InputGroupComponent, InputGroupProps, InputGroupValidates } from '../InputGroup'
import { Uu, Uish } from 'pollenium-uvaursi'
import { Address } from 'pollenium-buttercup'
import { Snowdrop } from 'pollenium-snowdrop'

interface AddressInputGroupProps extends Pick<InputGroupProps, 'label'> {
  onAddress: (address: Address | null) => void
  addressInSnowdrop?: Snowdrop<Uish | null>
}

const validates: InputGroupValidates = [
  async (addressHexish: string) => {
    if (addressHexish.length % 2 === 0) {
      return null
    }
    return 'Should be an even number of characters'
  },
  async (addressHexish: string) => {
    try {
      Uu.fromHexish(addressHexish)
    } catch(error) {
      return 'Not valid hexadecimal encoding'
    }
    return null
  },
  async (addressHexish: string) => {
    const addressUu = Uu.fromHexish(addressHexish)
    if (addressUu.u.length === 20) {
      return null
    }
    return 'Should be 20 bytes (40 hexadecimal characters) long'
  }
]


export class AddressInputGroupComponent extends React.Component<AddressInputGroupProps> {

  private readonly valueInSnowdrop = new Snowdrop<string | null>()

  constructor(props) {
    super(props)
    if (props.addressInSnowdrop) {
      props.addressInSnowdrop.addHandle((address) => {
        if (address === null) {
          this.valueInSnowdrop.emit(null)
        } else {
          this.valueInSnowdrop.emit(new Address(address).uu.toHex())
        }
      })
    }
  }

  render() {
    return (<InputGroupComponent
      { ...this.props }
      type='text'
      prepend="0x"
      onValue={ this.onValue.bind(this) }
      validates={ validates }
      valueInSnowdrop={ this.valueInSnowdrop }
    />)
  }

  onValue(value: string | null) {
    if (value === null) {
      this.props.onAddress(null)
      return
    }
    const address = new Address(Uu.fromHexish(value))
    this.props.onAddress(address)
  }

}
