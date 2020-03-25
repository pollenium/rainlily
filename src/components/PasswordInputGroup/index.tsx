import * as React from 'react'
import { LinearIconComponent } from '../LinearIcon'
import classNames from 'classnames'
import { InputGroupComponent, InputGroupProps, InputGroupValidates } from '../InputGroup'
import { Uu } from 'pollenium-uvaursi'

interface PasswordInputGroupProps extends Pick<InputGroupProps, 'label'> {
  onPassword: (password: Uu | null) => void
}

const validates: InputGroupValidates = [
  async (passwordUtf8: string) => {
    if (passwordUtf8.length > 24) {
      return null
    }
    return 'Password must be greater than 24 characters'
  }
]

export class PasswordInputGroupComponent extends React.Component<PasswordInputGroupProps, { isVisible: boolean}> {

  readonly prependElement: JSX.Element
  readonly appendElement: JSX.Element

  constructor(props) {
    super(props)
    this.state = { isVisible: false }

    this.prependElement = <LinearIconComponent icon='lock' align="left" />
  }

  render() {
    return (<InputGroupComponent
      { ...this.props }
      type={ this.state.isVisible ? 'text' : 'password' }
      prepend={ this.prependElement }
      append={ this.getAppendElement() }
      onValue={ this.onValue.bind(this) }
      validates={ validates }
    />)
  }

  getAppendElement(): JSX.Element {
    return (<div className="cursor-pointer" onClick={ this.onToggleClick.bind(this) }>
      <LinearIconComponent icon={ this.state.isVisible ? 'eye-crossed' : 'eye' } align="right" />
    </div>)
  }

  onValue(value: string | null) {
    if (value === null) {
      this.props.onPassword(null)
      return
    }
    const password = Uu.fromUtf8(value)
    this.props.onPassword(password)
  }

  onToggleClick() {
    this.setState({ isVisible: !this.state.isVisible })
  }

}
