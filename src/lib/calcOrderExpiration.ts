import { Uint256, Uintable } from 'pollenium-buttercup'

export function calcOrderExpiration(struct: {
  originalBlockNumber: Uintable,
  latestBlockNumber: Uintable,
  latency: number
}): Uint256 {

  const originalBlockNumber = new Uint256(struct.originalBlockNumber)
  const latestBlockNumber = new Uint256(struct.latestBlockNumber)
  const latency = struct.latency

  return originalBlockNumber.opAdd(
    latestBlockNumber.opSub(originalBlockNumber).opDiv(latency).opAdd(1).opMul(latency)
  )
}
