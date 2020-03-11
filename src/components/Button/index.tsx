import * as React from 'react'
import { LinearIconComponent } from '../LinearIcon'
import './index.scss'

export class ButtonComponent extends React.Component<{ text: string, icon?: string, onClick?: ()=>void, isDisabled?: boolean }> {
  render() {
    const linearIconComponent = this.props.icon ? (
      <span className="pad-small-right"><LinearIconComponent icon={ this.props.icon } /></span>
    ) : null
    return (
      <button
        className="button"
        onClick={ this.props.onClick ? this.props.onClick : null }
        disabled={ this.props.isDisabled }>
        { linearIconComponent }
        <span className="display-inline-block">{ this.props.text }</span>
      </button>
    )
  }
}
