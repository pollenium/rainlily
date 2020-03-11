import { Address, Uint256 } from 'pollenium-buttercup'
import { Uu, Uish } from 'pollenium-uvaursi'
import { EngineReader } from 'pollenium-alchemilla'
import { ethers } from 'ethers'
import { Bellflower } from 'pollenium-bellflower'
import { Snowdrop } from 'pollenium-snowdrop'

interface TokenBalanceMonitor {
  balance: Uint256 | null,
  balanceSnowdrop: Snowdrop<Uint256>
}

export class EngineBalancesMonitor {

  readonly holder: Address
  readonly engineReader: EngineReader
  readonly bellflower: Bellflower

  private readonly tokenBalanceMonitorsByTokenHex: { [tokenHex: string]: TokenBalanceMonitor } = {}

  private readonly tokens: Address[] = []
  private readonly balanceByTokenAddressHex: { [tokenHex: string]: Uint256} = {}
  private readonly balanceSnowdropsByTokenHex: { [tokenHex: string]: Snowdrop<Uint256> } = {}



  constructor(struct: {
    engine: Uish,
    holder: Uish,
    provider: ethers.providers.Provider,
    bellflower: Bellflower
  }) {
    this.holder = new Address(struct.holder)
    this.engineReader = new EngineReader({
      provider: struct.provider,
      address: struct.engine
    })

    struct.bellflower.blockSnowdrop.addHandle((block) => {
      this.updateTokenBalanceMonitors()
    })
  }

  private getTokenBalanceMonitor(tokenUish: Uish) {
    const token = new Address(tokenUish)
    const tokenHex = token.uu.toHex()
    if (this.tokenBalanceMonitorsByTokenHex[tokenHex] === undefined) {
      this.tokenBalanceMonitorsByTokenHex[tokenHex] = {
        balance: null,
        balanceSnowdrop: new Snowdrop<Uint256>()
      }
    }
    return this.tokenBalanceMonitorsByTokenHex[tokenHex]
  }

  getBalanceSnowdrop(tokenUish: Uish): Snowdrop<Uint256> {
    const token = new Address(tokenUish)
    const tokenHex = token.uu.toHex()
    if (this.balanceSnowdropsByTokenHex[tokenHex] === undefined) {
      this.balanceSnowdropsByTokenHex[tokenHex] = new Snowdrop<Uint256>()
    }
    return this.balanceSnowdropsByTokenHex[tokenHex]
  }

  private updateTokenBalanceMonitors() {
    const tokenHexes = Object.keys(this.tokenBalanceMonitorsByTokenHex)
    tokenHexes.forEach(async (tokenHex) => {
      const token = Uu.fromHexish(tokenHex)
      const balance = await this.engineReader.fetchBalance({
        holder: this.holder,
        token: token
      })
      const tokenBalanceMonitor = this.getTokenBalanceMonitor(token)
      if (tokenBalanceMonitor.balance !== null && tokenBalanceMonitor.balance.uu.getIsEqual(token)) {
        return
      }
      tokenBalanceMonitor.balance = balance
      tokenBalanceMonitor.balanceSnowdrop.emit(balance)
    })
  }

}
