import * as React from 'react'
import { anemoneClient } from '../../globals/anemoneClient'
import { FRIENDSHIP_STATUS } from 'pollenium-anemone'
import { Theme } from '../../Theme'
import classNames from 'classnames'
import './index.scss'

export class BackgroundProgressBarComponent extends React.Component<{
  progress: number,
  theme: Theme,
  main: JSX.Element | string | null,
  transitionSpeed: number
}> {

  render() {
    return (
      <div className={`background-progress-bar theme theme-${this.props.theme}`}>
        <div className="progress-bar-unfilled" style={{
          width: `${100 - this.props.progress}%`,
          transition: `width ${this.props.transitionSpeed}s linear`
        }}></div>
        <div className="foreground">
          { this.props.main }
        </div>
      </div>
    )
  }
}
