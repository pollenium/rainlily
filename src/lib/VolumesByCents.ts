import { Uint256 } from 'pollenium-buttercup'

export interface VolumesByCents {
  [centsString: string]: {
    buyy: Uint256,
    sell: Uint256
    both: Uint256
  }
}
