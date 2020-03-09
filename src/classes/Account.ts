import { Keypair } from 'pollenium-ilex'
import { Address, Uint256 } from 'pollenium-buttercup'
import { Snowdrop } from 'pollenium-snowdrop'
import { Uu, Uish } from 'pollenium-uvaursi'
import { genSha256 } from 'pollenium-shasta'
import { ethers } from 'ethers'
import { Bellflower } from 'pollenium-bellflower'
import { EngineReader } from 'pollenium-alchemilla'

interface BalanceInfo {
  balance: Uint256 | null,
  balanceSnowdrop: Snowdrop<Uint256>
}

export class Account {

  readonly keypair: Keypair
  readonly engineReader: EngineReader
  readonly bellflower: Bellflower

  private readonly engineBalanceInfosByTokenHex: { [tokenHex: string]: BalanceInfo } = {}


  constructor(struct: {
    keypair: Keypair,
    engine: Uish,
    provider: ethers.providers.Provider,
    bellflower: Bellflower
  }) {
    this.keypair = struct.keypair
    this.engineReader = new EngineReader({
      provider: struct.provider,
      address: struct.engine
    })
    this.bellflower = struct.bellflower
  }

  async fetchEngineBalance(token: Uish): Promise<Uint256> {
    const engineBalanceInfo = this.getEngineBalanceInfo(token)
    if (engineBalanceInfo.balance !== null) {
      return engineBalanceInfo.balance
    }
    return this.engineReader.fetchBalance({
      holder: this.keypair.getAddress(),
      token
    })
  }

  getEngineBalanceInfo(tokenUish: Uish): BalanceInfo {
    const token = new Address(tokenUish)
    const tokenHex = token.uu.toHex()
    if (this.engineBalanceInfosByTokenHex[tokenHex] !== undefined) {
      return this.engineBalanceInfosByTokenHex[tokenHex]
    }

    const balanceInfo = this.engineBalanceInfosByTokenHex[tokenHex] = {
      balance: null,
      balanceSnowdrop: new Snowdrop<Uint256>()
    }

    this.bellflower.blockSnowdrop.addHandle(async () => {
      const balance = await this.engineReader.fetchBalance({
        holder: this.keypair.getAddress(),
        token: token
      })
      if (balanceInfo.balance !== null && balanceInfo.balance.uu.getIsEqual(balance)) {
        return
      }
      balanceInfo.balance = balance
      balanceInfo.balanceSnowdrop.emit(balance)
    })

    return balanceInfo
  }

}
