import * as React from 'react'
import { LinearIconComponent } from '../LinearIcon'
import './index.scss'
import classNames from 'classnames'

export class PasswordInputGroupComponent extends React.Component<{ label: string }, { isActive: boolean }> {

  constructor(props) {
    super(props)
    this.state = {
      isActive: false
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
              className="input full"
              onFocus={ this.onFocus.bind(this) }
              onBlur={ this.onBlur.bind(this) }
            />
          </div>
          <div>
            <LinearIconComponent icon="eye" />
          </div>
        </div>
      </div>
    )
  }

  onFocus() {
    this.setState({ isActive: true })
  }

  onBlur() {
    this.setState({ isActive: false })
  }

}
