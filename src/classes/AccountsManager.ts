import { Keypair } from 'pollenium-ilex'
import { Address, Uint256 } from 'pollenium-buttercup'
import { Snowdrop } from 'pollenium-snowdrop'
import { Uu, Uish } from 'pollenium-uvaursi'
import { genSha256 } from 'pollenium-shasta'
import { EngineBalancesMonitor } from './EngineBalanceMonitor'
import { ethers } from 'ethers'
import { Bellflower } from 'pollenium-bellflower'
import { Account } from './Account'

export class AccountsManager {

  readonly engine: Address
  readonly provider: ethers.providers.Provider
  readonly bellflower: Bellflower

  readonly accountSnowdrop = new Snowdrop<Account | null>()
  readonly accountsSnowdrop = new Snowdrop<Account[]>()

  private accounts: Account[] = []
  private account: Account | null = null

  private readonly accountsByAddressHex: { [addressHex: string]: Account} = {}
  private readonly engineTokenBalanceSnowdropByTokenHex: { [tokenHex: string]: Snowdrop<Uint256> } = {}

  constructor(struct: {
    engine: Uish,
    provider: ethers.providers.Provider,
    bellflower: Bellflower
  }) {

    this.engine = new Address(struct.engine)
    this.provider = struct.provider
    this.bellflower = struct.bellflower

    const passwordUtf8 = localStorage.getItem('passwordUtf8')
    if (passwordUtf8 !== null) {
      try {
        const password = Uu.fromUtf8(passwordUtf8)
        this.login(password)
      } catch(error) {

      }
    }
  }

  getAccounts(): Account[] {
    return this.accounts
  }

  getAccount(): Account | null {
    return this.account
  }

  login(password: Uu) {
    const account = this.getOrCreateAccount(password)
    this.setAccount(account)
  }

  logout() {
    this.account = null
    this.accountSnowdrop.emit(null)
  }

  private getOrCreateAccount(password: Uu): Account {
    const privateKey = genSha256(password)
    const keypair = new Keypair(privateKey)
    const addressHex = keypair.getAddress().uu.toHex()

    if (this.accountsByAddressHex[addressHex] !== undefined) {
      return this.accountsByAddressHex[addressHex]
    }

    const account = new Account({
      engine: this.engine,
      provider: this.provider,
      bellflower: this.bellflower,
      keypair
    })
    this.accountsByAddressHex[addressHex] = account
    this.accounts.push(account)
    this.accountsSnowdrop.emit(this.accounts)
    return account
  }

  private setAccount(account: Account) {
    this.account = account
    this.accountSnowdrop.emit(this.account)
  }

  getEngineBalance(token: Uish): Uint256 | null {
    if (this.account === null) {
      return null
    }
    return this.account.getEngineBalanceInfo(token).balance
  }

  async fetchEngineBalance(token: Uish): Promise<null | Uint256> {
    if (this.account === null) {
      return null
    }
    return this.account.fetchEngineBalance(token)
  }



}
