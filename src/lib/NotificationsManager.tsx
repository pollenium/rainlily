import { Snowdrop } from 'pollenium-snowdrop'
import * as React from 'react'
import { AccountsComponent } from '../components/Accounts'
import { DaiManagerComponent } from '../components/DaiManager'
import { Theme } from '../Theme'

export interface Notification {
  theme: Theme,
  main: JSX.Element | string
}

export class NotificationsManager {

  readonly ttl = 3000
  readonly notificationSnowdrop = new Snowdrop<Notification>()


  queueNotification(notification: Notification) {
    this.notificationSnowdrop.emit(notification)
  }
}
