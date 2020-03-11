import * as React from 'react'
import { LinearIconComponent } from '../LinearIcon'
import './index.scss'
import classNames from 'classnames'
import copy from 'clipboard-copy'

export class CopyComponent extends React.Component<{ text: string }, { isCopied: boolean }> {

  constructor(props) {
    super(props)
    this.state = { isCopied: false }
  }

  render() {
    return (
      <div
        className={ classNames('copy', 'flex-columns', 'pad', { copied: this.state.isCopied }) }
        onClick= { this.onClick.bind(this) }
        >
        <div className="text-center flex-grow overflow-ellipsis">{
          this.state.isCopied ? 'Copied!' : this.props.text
        }</div>
        <div className="flex-shrink pad-small-left">
          <LinearIconComponent icon={ this.state.isCopied ? 'clipboard-check' : 'clipboard-empty' }/>
        </div>
      </div>

    )
  }

  onClick() {
    this.setState({ isCopied: true })
    copy(this.props.text)
    setTimeout(() => {
      this.setState({ isCopied: false })
    }, 1000)
  }

}
