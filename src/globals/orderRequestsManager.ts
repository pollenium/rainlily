import { OrderRequestsManager } from '../classes/OrderRequestsManager'
import { bellflower } from './bellflower'
import { anemoneClient } from './anemoneClient'
import { engineReader } from './engineReader'
import { applicationId } from './applicationId'

export const orderRequestsManager = new OrderRequestsManager({
  bellflower,
  anemoneClient,
  applicationId,
  engineReader,
  latency: 10
})
