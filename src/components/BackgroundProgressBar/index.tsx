import * as React from 'react'
import { anemoneClient } from '../../globals/anemoneClient'
import { FRIENDSHIP_STATUS } from 'pollenium-anemone'
import classNames from 'classnames'
import './index.scss'

export class BrambleMonitorComponent extends React.Component<{}, { progress: number, isConnected: boolean, isHidden: boolean }> {

  constructor(props) {
    super(props)
    this.state = { progress: 0, isConnected: false, isHidden: false }
    this.loopIncrementProgress()

    anemoneClient.summarySnowdrop.addHandle((clientSummary) => {
      const connectedFriendshipsCount = clientSummary.struct.partySummary.getFriendshipsCountByStatus(FRIENDSHIP_STATUS.CONNECTED)
      if (connectedFriendshipsCount > 0 && !this.state.isConnected) {
        this.setState({
          isConnected: true
        })
        return
      }
      if (connectedFriendshipsCount === 0 && this.state.isConnected) {
        this.setState({
          progress: 0,
          isConnected: false,
          isHidden: false
        })
        this.loopIncrementProgress()
        return
      }
    })
  }

  render() {
    return (
      <div className={ classNames('bramble-monitor', 'flex-no-change', {
        connected: this.state.isConnected,
        'display-none': this.state.isHidden
      })}>
        <div className="background">
          <div className="progress-bar" style={{
            width: `${this.state.progress}%`
          }}></div>
        </div>
        <div className="foreground">
          <div className="container pad-small-vertical pad-horizontal-if-narrow text-center">
            { this.state.isConnected ? 'Connected!' : 'Connecting to decentralized order book'}
          </div>
        </div>
      </div>
    )
  }

  loopIncrementProgress() {

    if (this.state.progress >= 100) {
      return
    }

    if (this.state.isConnected) {
      this.setState({ progress: 100 })
      setTimeout(() => {
        console.log('set isHiden true')
        this.setState({ isHidden: true })
      }, 2000)
      return
    }

    const increment = Math.floor((100 - this.state.progress) / 4)
    this.setState({ progress: this.state.progress + increment })
    setTimeout(this.loopIncrementProgress.bind(this), 1000)
  }

}
