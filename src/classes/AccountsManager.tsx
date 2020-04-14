import * as React from 'react'
import { Keypair } from 'pollenium-ilex'
import { Address, Uint256 } from 'pollenium-buttercup'
import { Snowdrop } from 'pollenium-snowdrop'
import { Sundrop } from 'pollenium-sundrop'
import { Uu, Uish } from 'pollenium-uvaursi'
import { genSha256 } from 'pollenium-shasta'
import { EngineBalancesMonitor } from './EngineBalanceMonitor'
import { ethers } from 'ethers'
import { Bellflower } from 'pollenium-bellflower'
import { Account } from './Account'
import { NotificationsManager } from './NotificationsManager'
import { Theme } from '../Theme'
import { DaiComponent } from '../components/Dai'
import { Client as DianthusClient } from 'pollenium-dianthus'
import { EngineReader } from 'pollenium-alchemilla'
import { DaishReader } from 'pollenium-dianella'
import { THOUSAND, HOUR_S } from 'pollenium-ursinia'

export class AccountsManager {

  readonly engine: Address
  readonly engineReader: EngineReader
  readonly provider: ethers.providers.Provider
  readonly bellflower: Bellflower
  readonly notificationsManager: NotificationsManager
  readonly dai: Address
  readonly daishReader: DaishReader
  readonly dianthusClient: DianthusClient

  readonly accountSnowdrop = new Snowdrop<Account | null>()
  readonly accountsSnowdrop = new Snowdrop<Account[]>()

  private accounts: Account[] = []
  private account: Account | null = null

  private readonly accountsByAddressHex: { [addressHex: string]: Account} = {}
  private readonly engineBalanceSundropsByTokenHex: { [tokenHex: string]: Sundrop<Uint256> } = {}
  private readonly nativeBalanceSundropsByTokenHex: { [tokenHex: string]: Sundrop<Uint256> } = {}

  constructor(struct: {
    engine: Uish,
    provider: ethers.providers.Provider,
    bellflower: Bellflower,
    notificationsManager: NotificationsManager,
    dai: Uish,
    engineReader: EngineReader,
    daishReader: DaishReader
    dianthusClient: DianthusClient
  }) {

    this.engine = new Address(struct.engine)
    this.engineReader = struct.engineReader
    this.provider = struct.provider
    this.bellflower = struct.bellflower
    this.notificationsManager = struct.notificationsManager
    this.dai = new Address(struct.dai)
    this.daishReader = struct.daishReader
    this.dianthusClient = struct.dianthusClient

    const passwordUtf8 = localStorage.getItem('passwordUtf8')
    try {
      this.load()
    } catch(error) {
      console.log(error)
    }

    const dianthusClient = new DianthusClient('https://dianthus-us-1.herokuapp.com/')

    setTimeout(() => {
      // Make async to prevent errors in constructor
      // this.linkDepositNotifications()
      // this.linkPermitRequests()
      this.linkDianthus()
    }, 0)

  }

  // private linkDepositNotifications() {
  //
  //   let latestNativeAttodaiBalance: Uint256 | null = null
  //
  //   this.getNativeBalanceSnowdrop(this.dai).addHandle((nativeAttodaiBalance) => {
  //
  //     const prevNativeAttodaiBalance = latestNativeAttodaiBalance
  //     latestNativeAttodaiBalance = nativeAttodaiBalance
  //
  //     if (prevNativeAttodaiBalance !== null && nativeAttodaiBalance.compEq(prevNativeAttodaiBalance)) {
  //       return
  //     }
  //
  //
  //   })
  // }

  private linkDianthus() {

    let prevEngineAttodaiBalance: Uint256 | null = null

    this.getEngineBalanceSnowdrop(this.dai).addHandle((engineAttodaiBalance) => {
      if (prevEngineAttodaiBalance !== null && prevEngineAttodaiBalance.compLt(engineAttodaiBalance)) {
        this.notificationsManager.queueNotification({
          theme: Theme.SUCCESS,
          main: (<span><DaiComponent attodai={ engineAttodaiBalance }/> available!</span>)
        })
      }

      prevEngineAttodaiBalance = engineAttodaiBalance

    })

    this.bellflower.blockIndexSnowdrop.addHandle(async () => {
      const nativeAttodaiBalance = await this.fetchNativeBalance(this.dai)

      if (nativeAttodaiBalance.compEq(0)) {
        return
      }

      const holder = this.account.keypair.getAddress()

      const allowance = await this.daishReader.fetchAllowance({
        holder,
        spender: this.engine
      })

      this.notificationsManager.queueNotification({
        theme: Theme.INFO,
        main: (<span>Deposit of <DaiComponent attodai={ nativeAttodaiBalance }/> initiated</span>)
      })


      if (allowance.compEq(0)) {

        const nonce = await this.daishReader.fetchNonce(holder)

        this.dianthusClient.genAndUploadPermitRequest({
          holderPrivateKey: this.account.keypair.privateKey,
          spender: this.engine,
          nonce
        }).catch((error) => {
          this.notificationsManager.queueNotification({
            theme: Theme.ERROR,
            main: `Deposit Permit Failed: ${error.message}`
          })
        })

      } else {

        const amount = allowance.compGt(nativeAttodaiBalance) ? nativeAttodaiBalance : allowance
        const expiration = Math.floor(new Date().getTime() / THOUSAND) + HOUR_S

        console.log('genAndUploadDepositßRequest')
        this.dianthusClient.genAndUploadDepositRequest({
          fromPrivateKey: this.account.keypair.privateKey,
          to: this.account.keypair.getAddress(),
          token: this.dai,
          amount: amount,
          expiration: expiration,
          nonce: Uu.genRandom(32),
          actionSalt: await this.engineReader.fetchDepositSalt()
        }).catch((error) => {
          this.notificationsManager.queueNotification({
            theme: Theme.ERROR,
            main: `Deposit Failed: ${error.message}`
          })
        })
      }

    })

  }

  getAccounts(): Account[] {
    return this.accounts
  }

  getAccount(): Account | null {
    return this.account
  }

  removeAccount(account: Account) {
    this.accounts = this.accounts.filter((_account) => {
      return account.id !== _account.id
    })
    this.accountsSnowdrop.emit(this.accounts)

    this.notificationsManager.queueNotification({
      theme: Theme.WARNING,
      main: `Removed ${ account.keypair.getAddress().uu.toHex() }`
    })

    if (this.account && this.account.id === account.id) {
      this.account = null
      this.accountSnowdrop.emit(null)
      if (this.accounts.length > 0) {
        this.setAccount(this.accounts[0])
      }
    }
    this.save()
  }

  login(password: Uu) {
    const privateKey = genSha256(password)
    const account = this.getOrCreateAccount(privateKey)
    this.setAccount(account)
  }

  private getOrCreateAccount(privateKey: Uish): Account {
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
    this.save()
    return account
  }

  setAccount(account: Account) {
    this.account = account
    this.accountSnowdrop.emit(this.account)

    Object.keys(this.engineBalanceSundropsByTokenHex).forEach(async (tokenHex) => {
      const token = new Address(Uu.fromHexish(tokenHex))
      const parentSnowdrop = this.account.getEngineBalanceInfo(token).balanceSnowdrop
      this.engineBalanceSundropsByTokenHex[tokenHex].setParentSnowdrop(parentSnowdrop)
      const balance = await this.fetchEngineBalance(token)
      parentSnowdrop.emit(balance)
    })

    Object.keys(this.nativeBalanceSundropsByTokenHex).forEach(async (tokenHex) => {
      const token = new Address(Uu.fromHexish(tokenHex))
      const parentSnowdrop = this.account.getNativeBalanceInfo(token).balanceSnowdrop
      this.nativeBalanceSundropsByTokenHex[tokenHex].setParentSnowdrop(parentSnowdrop)
      const balance = await this.fetchNativeBalance(token)
      parentSnowdrop.emit(balance)
    })

    this.notificationsManager.queueNotification({
      theme: Theme.SUCCESS,
      main: `Logged into ${account.keypair.getAddress().uu.toHex()}`
    })

    this.save()
  }

  getEngineBalance(token: Uish): Uint256 | null {
    if (this.account === null) {
      return null
    }
    return this.account.getEngineBalanceInfo(token).getBalance()
  }

  getNativeBalance(token: Uish): Uint256 | null {
    if (this.account === null) {
      return null
    }
    return this.account.getNativeBalanceInfo(token).getBalance()
  }

  async fetchEngineBalance(token: Uish): Promise<null | Uint256> {
    if (this.account === null) {
      return null
    }
    return this.account.fetchEngineBalance(token)
  }

  async fetchNativeBalance(token: Uish): Promise<null | Uint256> {
    if (this.account === null) {
      return null
    }
    return this.account.fetchNativeBalance(token)
  }

  getEngineBalanceSnowdrop(tokenUish: Uish): Snowdrop<Uint256> {
    const token = new Address(tokenUish)
    const tokenHex = token.uu.toHex()
    if (this.engineBalanceSundropsByTokenHex[tokenHex] !== undefined) {
      return this.engineBalanceSundropsByTokenHex[tokenHex]
    }
    const balanceSundrop = this.engineBalanceSundropsByTokenHex[tokenHex] = new Sundrop<Uint256>()
    if (this.account) {
      const parentSnowdrop = this.account.getEngineBalanceInfo(token).balanceSnowdrop
      balanceSundrop.setParentSnowdrop(parentSnowdrop)
    }
    return balanceSundrop
  }

  getNativeBalanceSnowdrop(tokenUish: Uish): Snowdrop<Uint256> {
    const token = new Address(tokenUish)
    const tokenHex = token.uu.toHex()
    if (this.nativeBalanceSundropsByTokenHex[tokenHex] !== undefined) {
      return this.nativeBalanceSundropsByTokenHex[tokenHex]
    }
    const balanceSundrop = this.nativeBalanceSundropsByTokenHex[tokenHex] = new Sundrop<Uint256>()
    if (this.account) {
      const parentSnowdrop = this.account.getNativeBalanceInfo(token).balanceSnowdrop
      balanceSundrop.setParentSnowdrop(parentSnowdrop)
    }
    return balanceSundrop
  }

  private save() {
    const privateKeyHexes: string[] = this.accounts.map((account) => {
      return account.keypair.privateKey.uu.toHex()
    })
    localStorage.setItem('privateKeyHexesJson', JSON.stringify(privateKeyHexes))

    if (this.account === null) {
      localStorage.removeItem('accountId')
    } else {
      localStorage.setItem('accountId', this.account.id)
    }
  }

  private load() {
    const privateKeyHexesJson = localStorage.getItem('privateKeyHexesJson')
    const accountId = localStorage.getItem('accountId')

    console.log('accountId', accountId)

    if (privateKeyHexesJson === null) {
      return
    }

    const privateKeyHexes = JSON.parse(privateKeyHexesJson)
    const privateKeys = privateKeyHexes.map((privateKeyHex) => {
      return Uu.fromHexish(privateKeyHex)
    })
    console.log('privateKeys', privateKeys)

    privateKeys.forEach((privateKey) => {
      this.getOrCreateAccount(privateKey)
    })

    if (accountId === null) {
      return
    }
    const account = this.accounts.find((account) => {
      return account.id === accountId
    })
    if (account) {
      this.setAccount(account)
    }
  }

}
