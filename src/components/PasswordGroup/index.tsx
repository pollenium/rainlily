import * as React from 'react'
import { LinearIconComponent } from '../LinearIcon'
import './index.scss'
import classNames from 'classnames'

export class PasswordGroupComponent extends React.Component<{
  label: string,
  value: string,
  onValue: (passwordUtf8: string)=>void
}, { isActive: boolean, isVisible: boolean }> {

  private passwordInput: HTMLInputElement

  constructor(props) {
    super(props)
    this.state = {
      isActive: false,
      isVisible: false
    }
  }

  render() {
    return (
      <div className={
        classNames('input-group', {
          active: this.state.isActive
        })
      }>
        <div>{ this.props.label }</div>
        <div className="main flex-columns pad-small-vertical">
          <div style={{
            maxWidth: 20
          }}>
            <LinearIconComponent icon="lock" />
          </div>
          <div className="flex-grow">
            <input
              value={ this.props.value }
              type={ this.state.isVisible ? 'text' : 'password' }
              className="input full"
              onFocus={ this.onInputFocus.bind(this) }
              onBlur={ this.onInputBlur.bind(this) }
              onInput={ this.onInputInput.bind(this) }
              ref={ (input) => { this.passwordInput = input}}
            />
          </div>
          <div className="cursor-pointer" onClick={ this.onToggleClick.bind(this) }>
            <LinearIconComponent icon={ this.state.isVisible ? 'eye' : 'eye-crossed' } />
          </div>
        </div>
      </div>
    )
  }

  onToggleClick() {
    this.setState({
      isVisible: !this.state.isVisible
    })
  }

  onInputFocus() {
    this.setState({ isActive: true })
  }

  onInputBlur() {
    this.setState({ isActive: false })
  }

  onInputInput() {
    if (!this.props.onValue) {
      return
    }
    this.props.onValue(this.passwordInput.value)
  }

}
