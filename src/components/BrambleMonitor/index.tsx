import * as React from 'react'
import { anemoneClient } from '../../globals/anemoneClient'
import { FRIENDSHIP_STATUS } from 'pollenium-anemone'
import { BackgroundProgressBarComponent } from '../BackgroundProgressBar'
import { Theme } from '../../Theme'
import classNames from 'classnames'

export class BrambleMonitorComponent extends React.Component<{}, { progress: number, theme: Theme, isHidden: boolean, isConnected: boolean }> {

  private loopIncrementProgressIntervalId: number | null = null

  constructor(props) {
    super(props)
    this.state = { progress: 0, theme: Theme.WARNING, isHidden: true, isConnected: false }

    anemoneClient.summarySnowdrop.addHandle((clientSummary) => {
      const connectedFriendshipsCount = clientSummary.struct.partySummary.getFriendshipsCountByStatus(FRIENDSHIP_STATUS.CONNECTED)
      if (connectedFriendshipsCount === 0) {
        this.setState({
          isConnected: false,
          isHidden: false,
          theme: Theme.WARNING,
        })
        this.maybeLoopIncrementProgress()
      } else {
        this.maybeStopLoopIncrementProgress()
        this.setState({
          isConnected: true,
          theme: Theme.SUCCESS,
          progress: 100
        })
        setTimeout(() => {
          if (this.loopIncrementProgressIntervalId !== null) {
            return
          }
          this.setState({ isHidden: true, progress: 0 })

        }, 2000)
      }
    })
  }

  render() {
    return (
      <div className={ classNames('bramble-monitor', 'flex-no-change', {
        'display-none': this.state.isHidden
      })}>
        <BackgroundProgressBarComponent
          theme={this.state.theme}
          progress={this.state.progress}
          main={
            <div className="container pad-small-vertical pad-horizontal-if-narrow text-center">
              { this.state.isConnected ? 'Connected!' : 'Connecting to decentralized order book' }
            </div>
          }
          transitionSpeed={ 2 }
        />
      </div>
    )
  }

  maybeLoopIncrementProgress() {

    if (this.loopIncrementProgressIntervalId !== null) {
      return
    }

    this.loopIncrementProgressIntervalId = setInterval(() => {
      const increment = Math.floor((100 - this.state.progress) / 4)
      const progress = this.state.progress + increment

      this.setState({ progress })

      if (progress >= 100) {
        this.maybeStopLoopIncrementProgress()
        return
      }

    }, 1000)
  }

  maybeStopLoopIncrementProgress() {
    if (this.loopIncrementProgressIntervalId === null) {
      return
    }
    clearInterval(this.loopIncrementProgressIntervalId)
    this.loopIncrementProgressIntervalId = null
  }

}
