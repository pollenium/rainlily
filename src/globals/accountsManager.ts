import { AccountsManager } from '../classes/AccountsManager'
import { engine, dai } from 'pollenium-xanthoceras'
import { provider } from './provider'
import { bellflower } from './bellflower'
import { notificationsManager } from './notificationsManager'
import { daishReader } from './daishReader'
import { engineReader } from './engineReader'
import { dianthusClient } from './dianthusClient'

export const accountsManager = new AccountsManager({
  engine,
  provider,
  bellflower,
  notificationsManager,
  dai,
  daishReader,
  engineReader,
  dianthusClient
})
