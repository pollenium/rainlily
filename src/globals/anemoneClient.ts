import { Client as AnemoneClient, clientDefaults as anemoneClientDefaults } from 'pollenium-anemone'

export const anemoneClient = new AnemoneClient({
  ...anemoneClientDefaults,
  signalingServerUrls: [
    'wss://begonia-us-1.herokuapp.com',
    'wss://begonia-us-1.herokuapp.com'
  ],
  sdpTimeout: 20,
  connectionTimeout: 20
})
