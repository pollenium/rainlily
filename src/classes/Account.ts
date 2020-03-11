import { Keypair } from 'pollenium-ilex'
import { Address, Uint256 } from 'pollenium-buttercup'
import { Snowdrop } from 'pollenium-snowdrop'
import { Uu, Uish } from 'pollenium-uvaursi'
import { genSha256 } from 'pollenium-shasta'
import { ethers } from 'ethers'
import { Bellflower } from 'pollenium-bellflower'
import { EngineReader } from 'pollenium-alchemilla'
import { TokenReader } from 'pollenium-toadflax'

class BalanceInfo {

  readonly balanceSnowdrop = new Snowdrop<Uint256>()

  private balance: Uint256 | null = null

  getBalance(): Uint256 | null {
    return this.balance
  }


  maybeSetBalance(balance: Uint256) {
    if (this.balance !== null && this.balance.uu.getIsEqual(balance)) {
      return
    }
    this.balance = balance
    this.balanceSnowdrop.emit(balance)
  }

}

export class Account {

  readonly id: string
  readonly keypair: Keypair
  readonly provider: ethers.providers.Provider
  readonly engineReader: EngineReader
  readonly bellflower: Bellflower

  private readonly engineBalanceInfosByTokenHex: { [tokenHex: string]: BalanceInfo } = {}
  private readonly nativeBalanceInfosByTokenHex: { [tokenHex: string]: BalanceInfo } = {}


  constructor(struct: {
    keypair: Keypair,
    engine: Uish,
    provider: ethers.providers.Provider,
    bellflower: Bellflower
  }) {
    this.id = struct.keypair.getAddress().uu.toHex()
    this.keypair = struct.keypair
    this.engineReader = new EngineReader({
      provider: struct.provider,
      address: struct.engine
    })
    this.provider = struct.provider
    this.bellflower = struct.bellflower
  }

  async fetchEngineBalance(token: Uish): Promise<Uint256> {
    const balance = this.getEngineBalanceInfo(token).getBalance()
    if (balance !== null) {
      return balance
    }
    return this.engineReader.fetchBalance({
      holder: this.keypair.getAddress(),
      token
    })
  }

  async fetchNativeBalance(token: Uish): Promise<Uint256> {
    const balance = this.getNativeBalanceInfo(token).getBalance()
    if (balance !== null) {
      return balance
    }
    const tokenReader = new TokenReader({
      address: token,
      provider: this.provider
    })
    return tokenReader.fetchBalance(this.keypair.getAddress())
  }

  getEngineBalanceInfo(tokenUish: Uish): BalanceInfo {
    const token = new Address(tokenUish)
    const tokenHex = token.uu.toHex()
    if (this.engineBalanceInfosByTokenHex[tokenHex] !== undefined) {
      return this.engineBalanceInfosByTokenHex[tokenHex]
    }

    const balanceInfo = this.engineBalanceInfosByTokenHex[tokenHex] = new BalanceInfo()

    this.bellflower.blockSnowdrop.addHandle(async () => {
      const balance = await this.engineReader.fetchBalance({
        holder: this.keypair.getAddress(),
        token: token
      })
      balanceInfo.maybeSetBalance(balance)
    })

    return balanceInfo
  }

  getNativeBalanceInfo(tokenUish: Uish): BalanceInfo {
    const token = new Address(tokenUish)
    const tokenHex = token.uu.toHex()
    if (this.nativeBalanceInfosByTokenHex[tokenHex] !== undefined) {
      return this.nativeBalanceInfosByTokenHex[tokenHex]
    }

    const balanceInfo = this.nativeBalanceInfosByTokenHex[tokenHex] = new BalanceInfo()

    this.bellflower.blockSnowdrop.addHandle(async () => {
      const tokenReader = new TokenReader({
        address: token,
        provider: this.provider
      })
      const balance = await tokenReader.fetchBalance(this.keypair.getAddress())
      balanceInfo.maybeSetBalance(balance)
    })

    return balanceInfo
  }

  getLinkUrl(): string {
    return `https://etherscan.io/address/${this.keypair.getAddress().uu.toPhex()}`
  }

}
