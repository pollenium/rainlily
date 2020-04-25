export interface VolumePercentsByCents {
  [centsString: string]: {
    buyyPercent: number,
    sellPercent: number,
  }
}
