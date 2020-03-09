import { AccountManager } from '../classes/AccountManager'
import { engine } from './engine'
import { provider } from './provider'
import { bellflower } from './bellflower'

export const accountManager = new AccountManager({
  engine,
  provider,
  bellflower
})
