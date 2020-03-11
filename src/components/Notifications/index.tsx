import * as React from 'react'
import { notificationsManager } from '../../globals/notificationsManager'
import { NotificationStruct, NotificationType } from '../../classes/NotificationsManager'
import classNames from 'classnames'
import './index.scss'

export class NotificationsComponent extends React.Component<{},{
  notificationStruct: NotificationStruct | null,
}> {

  private clearTimeoutId: number | null = null

  constructor(props) {
    super(props)
    this.state = {
      notificationStruct: null,
    }

    notificationsManager.notificationStructSnowdrop.addHandle((notificationStruct) => {
      this.setState({ notificationStruct })
      if (this.clearTimeoutId !== null) {
        clearTimeout(this.clearTimeoutId)
      }
      this.clearTimeoutId = setTimeout(() => {
        this.setState({ notificationStruct: null })
      }, notificationsManager.ttl)
    })
  }

  render() {
    if (this.state.notificationStruct === null) {
      return null
    }
    return (
      <div className="notifications" notification-type={ this.state.notificationStruct.type }>
        <div
          className="container pad-small-vertical pad-horizontal-if-narrow text-center">
          { this.state.notificationStruct.mainElement }
        </div>
      </div>
    )
  }
}
