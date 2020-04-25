import { Market } from '../lib/Market'
import { overseers } from 'pollenium-xanthoceras'

export const markets: Market[] = [
  new Market({
    name: 'Trump Elected',
    imageFileName: 'trump-victorious.jpg',
    overseer: overseers.trump2020
  })
]
