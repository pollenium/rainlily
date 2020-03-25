import { Client as DianthusClient } from 'pollenium-dianthus'

// const serverUrl = 'https://dianthus-us-1.herokuapp.com'
const serverUrl = 'http://localhost:3000'

export const dianthusClient = new DianthusClient(serverUrl)
