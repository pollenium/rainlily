import { AccountsManager } from '../classes/AccountsManager'
import { engine } from './engine'
import { provider } from './provider'
import { bellflower } from './bellflower'

export const accountsManager = new AccountsManager({
  engine,
  provider,
  bellflower
})
