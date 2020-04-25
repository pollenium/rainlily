import { SignedOrder } from 'pollenium-alchemilla'
import { VolumePercentsByCents } from './VolumePercentsByCents'
import { getCumulativeVolumesByCents } from './getCumulativeVolumesByCents'
import { Uint256 } from 'pollenium-buttercup'

export function getCumulativeVolumePercentsByCents(signedOrders: SignedOrder[]): VolumePercentsByCents | null {

  if (signedOrders.length === 0) {
    return null
  }

  const cumulativeVolumePercentsByCents: VolumePercentsByCents = {}
  const cumulativeVolumesByCents = getCumulativeVolumesByCents(signedOrders)

  let maxBuyPlusSell = new Uint256(0)

  for (let i = 0; i < 100; i++) {
    const both = cumulativeVolumesByCents[i].both
    if (both.compGt(maxBuyPlusSell)) {
      maxBuyPlusSell = both
    }
  }

  for (let i = 0; i < 100; i++) {
    const buyy = cumulativeVolumesByCents[i].buyy
    const sell = cumulativeVolumesByCents[i].sell
    const buyyPercent = buyy.opMul(100).opDiv(maxBuyPlusSell).toNumber()
    const sellPercent = sell.opMul(100).opDiv(maxBuyPlusSell).toNumber()
    cumulativeVolumePercentsByCents[i] = { buyyPercent, sellPercent }
  }

  return cumulativeVolumePercentsByCents
}
