import { Bellflower } from 'pollenium-bellflower'
import { provider } from './provider'
import { notificationsManager } from './notificationsManager'
import { Theme } from '../Theme'

export const bellflower = new Bellflower(provider)

bellflower.blockSnowdrop.addHandle((block) => {
  notificationsManager.queueNotification({
    theme: Theme.INFO,
    main: `Received Block #${block.number}`
  })
})
