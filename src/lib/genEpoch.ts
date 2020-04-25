
export function genEpoch(): number {
  return Math.floor(new Date().getTime() / 1000)
}
