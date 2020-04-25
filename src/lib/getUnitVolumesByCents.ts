import { SignedOrder, OrderDirection } from 'pollenium-alchemilla'
import { VolumesByCents } from './VolumesByCents'
import { Uint256 } from 'pollenium-buttercup'
import { e18 } from '../globals/e18'

export function getUnitVolumesByCents(signedOrders: SignedOrder[]): VolumesByCents {

  const volumesByCents: VolumesByCents = {}

  for (let i = 0; i <= 100; i++) {
    volumesByCents[i] = {
      buyy: new Uint256(0),
      sell: new Uint256(0),
      both: new Uint256(0)
    }
  }

  signedOrders.forEach((signedOrder) => {
    const cents = signedOrder.priceNumer.opMul(100).opDiv(signedOrder.priceDenom).opDiv(e18)

    if (cents.compGt(100)) { return }

    const centsString = cents.toNumberString(10)

    if (signedOrder.direction === OrderDirection.BUYY) {
      const quotTokenLimit = signedOrder.tokenLimit
      volumesByCents[centsString].buyy = volumesByCents[centsString].buyy.opAdd(quotTokenLimit)
    } else {
      const quotTokenLimit = signedOrder.tokenLimit.opMul(signedOrder.priceNumer).opDiv(signedOrder.priceDenom)
      volumesByCents[centsString].sell = volumesByCents[centsString].sell.opAdd(quotTokenLimit)
    }

    volumesByCents[centsString].both = volumesByCents[centsString].buyy.opAdd(volumesByCents[centsString].sell)
  })
  return volumesByCents
}
