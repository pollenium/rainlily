import { Snowdrop } from 'pollenium-snowdrop'
import * as React from 'react'
import { AccountsComponent } from '../components/Accounts'
import { DaiManagerComponent } from '../components/DaiManager'
import delay from 'delay'

export enum NotificationType {
  SUCCESS = 'success',
  ERROR   = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

export interface NotificationStruct {
  type: NotificationType,
  mainElement: JSX.Element
}

export class NotificationsManager {

  readonly ttl = 3000
  readonly notificationStructSnowdrop = new Snowdrop<NotificationStruct>()

  private notificationStructs: NotificationStruct[] = []
  private nextStepPromise: Promise<void> = delay(0)

  queueNotification(notificationStruct: NotificationStruct) {
    this.notificationStructs.push(notificationStruct)

    this.nextStepPromise.then(() => {
      this.notificationStructSnowdrop.emit(this.notificationStructs.shift())
    })

    this.nextStepPromise = this.nextStepPromise.then(() => {
      return delay(this.ttl)
    })
  }
}
