import * as React from 'react'
import { OptionsComponent, OptionStruct } from '../Options'
import { DividerComponent } from '../Divider'
import { ButtonComponent } from '../Button'
import { Market } from '../../classes/Market'
import { BopManager } from '../../classes/BopManager'
import { AuthComponent } from '../Auth'
import { SquareComponent } from '../Square'
import { BopTypeComponent } from '../BopType'
import { DaiComponent } from '../Dai'
import { OrderDirectionComponent } from '../OrderDirection'
import { BlurbComponent } from '../Blurb'
import { Uint256 } from 'pollenium-buttercup'
import { Account } from '../../classes/Account'
import { OrderRequest, OrderRequestStatus } from '../../classes/OrderRequest'
import { bellflower } from '../../globals/bellflower'
import { accountsManager } from '../../globals/accountsManager'
import { orderRequestsManager } from '../../globals/orderRequestsManager'
import { genEpoch } from '../../utils/genEpoch'
import './index.scss'

class OrderRequestComponent extends React.Component<
  { orderRequest: OrderRequest },
  {
    blockIndex: Uint256 | null,
    status: OrderRequestStatus | null,
    secondsAgo: number,
    variTokenCumulativeFill: Uint256
  }
> {

  private bellflowerHandleId: number | null = null
  private statusHandleId: number | null = null
  private variTokenCumulativeFillHandleId: number | null = null

  private secondsAgoIntervalId = null

  constructor(props) {
    super(props)
    this.state = {
      blockIndex: null,
      status: null,
      secondsAgo: 0,
      variTokenCumulativeFill: new Uint256(0)
    }
  }

  async componentWillMount() {

    this.bellflowerHandleId = bellflower.blockIndexSnowdrop.addHandle((blockIndex) => {
      this.setState({ blockIndex })
    })

    this.statusHandleId = this.props.orderRequest.statusSnowdrop.addHandle((status) => {
      console.log('setState', status)
      this.setState({ status })
    })

    this.variTokenCumulativeFillHandleId = this.props.orderRequest.variTokenCumulativeFillSnowdrop.addHandle((variTokenCumulativeFill) => {
      this.setState({ variTokenCumulativeFill })
    })

    this.secondsAgoIntervalId = setInterval(() => {
      this.setState({
        secondsAgo: genEpoch() - this.props.orderRequest.createdAt
      })
    })

    await this.props.orderRequest.update()

    const blockIndex = await bellflower.fetchLatestBlockIndex()
    const variTokenCumulativeFill = await this.props.orderRequest.fetchVariTokenCumulativeFill()
    const status = this.props.orderRequest.getStatus()

    this.setState({ blockIndex, status, variTokenCumulativeFill })
  }

  componentWillUnmount() {
    if (this.bellflowerHandleId !== null) {
      bellflower.blockIndexSnowdrop.removeHandleById(this.bellflowerHandleId)
      this.bellflowerHandleId = null
    }

    if (this.statusHandleId !== null) {
      this.props.orderRequest.statusSnowdrop.removeHandleById(this.statusHandleId)
      this.statusHandleId = null
    }

    if (this.variTokenCumulativeFillHandleId !== null) {
      this.props.orderRequest.variTokenCumulativeFillSnowdrop.removeHandleById(this.variTokenCumulativeFillHandleId)
      this.variTokenCumulativeFillHandleId = null
    }

    if (this.secondsAgoIntervalId !== null) {
      clearInterval(this.secondsAgoIntervalId)
    }
  }

  render() {
    return <div className="margin-bottom"><BlurbComponent main={ this.getMainElement() }/></div>
  }

  getMainElement() {
    const orderRequest = this.props.orderRequest
    const struct = this.props.orderRequest.struct
    return (<div className="flex-columns">
      <div className="flex-change">
        <div>
          <OrderDirectionComponent orderDirection={ struct.direction }/> { new Uint256(struct.variTokenLimit).toNumberString(10) } <BopTypeComponent bopType={ struct.bopType }/> for <DaiComponent attodai={ new Uint256(struct.priceNumer) }/> each
        </div>
        <div>
          Created { this.getBlocksAgo() } blocks ({this.state.secondsAgo} seconds) ago
        </div>
        <div>
          Filled: { this.state.variTokenCumulativeFill.toNumberString(10) }/{new Uint256(struct.variTokenLimit).toNumberString(10)} <BopTypeComponent bopType={ struct.bopType }/>
        </div>
        <div>
          Status: { this.state.status }
        </div>
      </div>
      { this.getMainRightElement() }
    </div>)
  }

  getBlocksAgo(): string {
    return this.state.blockIndex === null ? '0' : this.state.blockIndex.opSub(this.props.orderRequest.struct.originalBlockNumber).toNumberString(10)
  }

  getMainRightElement() {
    if (this.state.status !== OrderRequestStatus.OPEN) {
      return null
    }
    return (<div className="text-right">
      <ButtonComponent main="Cancel" onClick={ this.onClick.bind(this) }/>
    </div>)
  }

  onClick() {
    this.props.orderRequest.cancel()
  }
}

export class MarketOrderRequestsComponent extends React.Component<
  { market: Market },
  { orderRequests: OrderRequest[] }
> {

  private genSnowdropId: number | null = null

  constructor(props) {
    super(props)
    this.state = { orderRequests: this.getOrderRequests() }
  }

  componentWillMount() {
    this.updateOrderRequests()
    this.genSnowdropId = orderRequestsManager.genSnowdrop.addHandle(() => {
      this.updateOrderRequests()
    })
  }

  componentWillUnmount() {
    if (this.genSnowdropId === null) {
      return
    }
    orderRequestsManager.genSnowdrop.removeHandleById(this.genSnowdropId)
  }

  updateOrderRequests() {
    this.setState({ orderRequests: this.getOrderRequests() })
  }

  render() {
    return (<div className="pad-vertical">
      { this.getOrderRequestsElement() }
    </div>)
  }

  getOrderRequests(): OrderRequest[] {
    const account = accountsManager.getAccount()

    if (account === null) {
      return
    }

    const trader = account.keypair.getAddress()

    return orderRequestsManager.orderRequests.filter((orderRequest) => {
      if(orderRequest.struct.market !== this.props.market) {
        return false
      }
      if (!orderRequest.struct.keypair.getAddress().uu.getIsEqual(trader)) {
        return false
      }
      return true
    }).sort((orderRequestA, orderRequestB) => {
      return orderRequestB.createdAt - orderRequestA.createdAt
    })
  }

  getOrderRequestsElement(): JSX.Element {
    const orderRequests = this.getOrderRequests()
    if (orderRequests.length === 0) {
      return <div className="text-large text-center">No Open Orders</div>
    }
    const orderRequestElements = orderRequests.map((orderRequest, index) => {
      return <OrderRequestComponent key={ index } orderRequest={ orderRequest }/>
    })
    return (<div>
      { orderRequestElements }
    </div>)
  }



}
