import { DaishReader } from 'pollenium-dianella'
import { provider } from './provider'
import { dai } from 'pollenium-xanthoceras'


export const daishReader = new DaishReader({
  provider,
  address: dai
})
