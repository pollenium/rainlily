import { Uint256 } from 'pollenium-buttercup'

export interface PriceRange {
  min: Uint256 | null,
  max: Uint256 | null
}
