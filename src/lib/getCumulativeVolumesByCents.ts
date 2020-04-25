import { SignedOrder } from 'pollenium-alchemilla'
import { VolumesByCents } from './VolumesByCents'
import { getUnitVolumesByCents } from './getUnitVolumesByCents'

export function getCumulativeVolumesByCents(signedOrders: SignedOrder[]): VolumesByCents | null {

  const cumulativeVolumesByCents = getUnitVolumesByCents(signedOrders)

  for (let i = 1; i <= 100; i++) {
    const prevSell = cumulativeVolumesByCents[i - 1].sell
    const sell = cumulativeVolumesByCents[i].sell
    cumulativeVolumesByCents[i].sell = prevSell.opAdd(sell)
  }

  for (let i = 99; i >= 0; i--) {
    const prevBuyy = cumulativeVolumesByCents[i + 1].buyy
    const buyy = cumulativeVolumesByCents[i].buyy
    cumulativeVolumesByCents[i].buyy = prevBuyy.opAdd(buyy)
  }

  for (let i = 0; i <= 100; i++) {
    const buyy = cumulativeVolumesByCents[i].buyy
    const sell = cumulativeVolumesByCents[i].sell
    cumulativeVolumesByCents[i].both = buyy.opAdd(sell)
  }

  return cumulativeVolumesByCents
}
