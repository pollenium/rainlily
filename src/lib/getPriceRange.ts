import { PriceRange } from './PriceRange'
import { SignedOrder } from 'pollenium-alchemilla'
import { getCumulativeVolumesByCents } from './getCumulativeVolumesByCents'
import { Uint256 } from 'pollenium-buttercup'
import { e18 } from '../globals/e18'
import { VolumesByCents } from './VolumesByCents'

enum OrderBookType {
  EMPTY = 'EMPTY',
  ONLY_BUYY = 'ONLY_BUYY',
  ONLY_SELL = 'ONLY_SELL',
  SPREAD_POSITIVE = 'SPREAD_POSITIVE',
  SPREAD_NEGATIVE = 'SPREAD_NEGATIVE',
  SPREAD_ZERO = 'SPREAD_ZERO'
}

export function getOrderBookType(cumulativeVolumesByCents: VolumesByCents): OrderBookType {
  if (
    cumulativeVolumesByCents['0'].buyy.compEq(0)
    && cumulativeVolumesByCents['100'].sell.compEq(0)
  ) {
    return OrderBookType.EMPTY
  }
  if (cumulativeVolumesByCents['0'].buyy.compEq(0)) {
    return OrderBookType.ONLY_SELL
  }
  if (cumulativeVolumesByCents['100'].sell.compEq(0)) {
    return OrderBookType.ONLY_BUYY
  }
  for (let i = 1; i <= 100; i++) {
    if (cumulativeVolumesByCents[i].both.compEq(0)) {
      return OrderBookType.SPREAD_POSITIVE
    }
    if (
      cumulativeVolumesByCents[i].buyy.compGt(0)
      && cumulativeVolumesByCents[i].sell.compGt(0)
    ) {
      return OrderBookType.SPREAD_NEGATIVE
    }
  }
  return OrderBookType.SPREAD_ZERO
}

export function getPriceRange(signedOrders: SignedOrder[]): PriceRange {

  if (signedOrders.length === 0) {
    return { min: null, max: null }
  }

  const cumulativeVolumesByCents = getCumulativeVolumesByCents(signedOrders)
  const orderBookType = getOrderBookType(cumulativeVolumesByCents)

  switch (orderBookType) {
    case OrderBookType.EMPTY:
      return { min: null, max: null }
    case OrderBookType.ONLY_BUYY:
      return getPriceRangeOnlyBuyy(cumulativeVolumesByCents)
    case OrderBookType.ONLY_SELL:
      return getPriceRangeOnlySell(cumulativeVolumesByCents)
    case OrderBookType.SPREAD_POSITIVE:
    case OrderBookType.SPREAD_NEGATIVE:
      return getPriceRangeSpreadNonzero(cumulativeVolumesByCents)
    case OrderBookType.SPREAD_ZERO:
      return getPriceRangeSpreadZero(cumulativeVolumesByCents)
  }

  let priceCents: number = 0

  for (let i = 1; i <= 100; i++) {
    const cumulativeVolume = cumulativeVolumesByCents[i].both
    if (cumulativeVolume.compLt(
      cumulativeVolumesByCents[priceCents].both
    )) {
      priceCents = i
    }
  }

  return {
    min: new Uint256(priceCents).opMul(e18).opDiv(100),
    max: null
  }
}

export function getPriceRangeOnlyBuyy(cumulativeVolumesByCents: VolumesByCents): PriceRange {
  for (let i = 1; i <= 100; i++) {
    const cumulativeVolume = cumulativeVolumesByCents[i].both
    if (cumulativeVolume.compEq(0)) {
      return { min: new Uint256(i - 1).opMul(e18).opDiv(100), max: null }
    }
  }
  return { min: null, max: null }
}

export function getPriceRangeOnlySell(cumulativeVolumesByCents: VolumesByCents): PriceRange {
  for (let i = 99; i >= 0; i--) {
    const cumulativeVolume = cumulativeVolumesByCents[i].both
    if (cumulativeVolume.compEq(0)) {
      return { min: null, max: new Uint256(i + 1).opMul(e18).opDiv(100) }
    }
  }
  return { min: null, max: null }
}

export function getPriceRangeSpreadNonzero(cumulativeVolumesByCents: VolumesByCents): PriceRange {

  let minCumulativeVolume = cumulativeVolumesByCents[0].both

  for (let i = 1; i <= 100; i++) {
    const cumulativeVolume = cumulativeVolumesByCents[i].both
    if (cumulativeVolume.compLt(minCumulativeVolume)) {
      minCumulativeVolume = cumulativeVolume
    }
  }

  const priceRange: PriceRange = { min: null, max: null}

  for (let i = 1; i <= 100; i++) {
    const cumulativeVolume = cumulativeVolumesByCents[i].both
    if (cumulativeVolume.compEq(minCumulativeVolume)) {
      if (priceRange.min === null) {
        priceRange.min = new Uint256(i - 1).opMul(e18).opDiv(100)
      }
    } else {
      if (priceRange.min !== null) {
        priceRange.max = new Uint256(i - 1).opMul(e18).opDiv(100)
        return priceRange
      }
    }
  }
  return priceRange
}

export function getPriceRangeSpreadZero(cumulativeVolumesByCents: VolumesByCents): PriceRange {

  for (let i = 0; i <= 99; i++) {
    const cumulativeBuyyVolume = cumulativeVolumesByCents[i].buyy
    const nextCumulativeSellVolume = cumulativeVolumesByCents[i + 1].sell

    if (
      cumulativeBuyyVolume.compGt(0)
      && nextCumulativeSellVolume.compGt(0)
    ) {
      return {
        min: new Uint256(i).opMul(e18).opDiv(100),
        max: new Uint256(i + 1).opMul(e18).opDiv(100)
      }
    }
  }
  return { min: null, max: null}
}
