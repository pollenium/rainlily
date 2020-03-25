import * as React from 'react'
import { notificationsManager } from '../../globals/notificationsManager'
import { Notification } from '../../classes/NotificationsManager'
import { BackgroundProgressBarComponent } from '../BackgroundProgressBar'
import { LinearIconComponent } from '../LinearIcon'
import { SquareComponent } from '../Square'
import classNames from 'classnames'
import './index.scss'

export class NotificationComponent extends React.Component<
  { notification: Notification },
  { progress: number, isClosed: boolean }> {

  constructor(props) {
    super(props)
    this.state = { progress: 0, isClosed: false }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ progress: 100 })
      setTimeout(() => {
        this.close()
      }, notificationsManager.ttl);
    }, 100)
  }
  render() {
    return (
      <div className={ classNames('notification', {
        'display-none': this.state.isClosed
      })}>
      <BackgroundProgressBarComponent
        theme={ this.props.notification.theme }
        transitionSpeed={ notificationsManager.ttl / 1000 }
        progress={ this.state.progress }
        main={
          <div
            className="pad text-center flex-columns">
            <div className="flex-grow flex-shrink no-wrap overflow-ellipsis">{ this.props.notification.main }</div>
            <SquareComponent/>
            <div className="text-bright clickable" onClick={ this.close.bind(this) }>
              <LinearIconComponent icon="cross" />
            </div>
          </div>
        }
        />
        <SquareComponent/>
      </div>
    )
  }
  close() {
    this.setState({ isClosed: true })
  }
}

export class NotificationGroupComponent extends React.Component<{}, {
  notifications: Notification[],
}> {

  private timeoutId: number | null = null

  constructor(props) {
    super(props)
    this.state = { notifications: [] }

    notificationsManager.notificationSnowdrop.addHandle((notification) => {
      const notifications = this.state.notifications
      notifications.push(notification)
      this.setState({ notifications })
    })
  }

  maybeClearTimeout() {
    if (this.timeoutId === null) {
      return
    }
    clearTimeout(this.timeoutId)
    this.timeoutId = null
  }

  render() {
    const notificationComponents = this.state.notifications.map((notification, index) => {
        return (<NotificationComponent key={ index } notification={ notification }/>)
    })
    return (<div className="notifications">
      { notificationComponents.reverse() }
    </div>)
  }

}
