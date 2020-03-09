import * as React from 'react'
import { OptionsComponent, OptionStruct } from '../Options'
import { DividerComponent } from '../Divider'
import { ButtonComponent } from '../Button'
import { BopManager } from '../../classes/BopManager'
import { CentipricesComponent } from '../Centiprices'
import { Block } from 'pollenium-bellflower'
import { bellflower } from '../../globals/bellflower'
import { provider } from '../../globals/provider'
import { Uint256, Uintable } from 'pollenium-buttercup'
import Bignumber from 'bignumber.js'
import './index.scss'

let block: Block | null = null

class CentipricesRowComponent extends React.Component<
  { bopManager: BopManager, blockNumber: Uint256 | null },
  { blockNumber: Uint256 | null, buyyCentiprice: number | null, sellCentiprice: number | null }
> {

  private isCentipriceSnowdropPairLinked: boolean = false

  constructor(props) {
    super(props)
    this.state = {
      blockNumber: null,
      buyyCentiprice: null,
      sellCentiprice: null
    }

    bellflower.blockSnowdrop.addHandle((block) => {
      this.setState({
        blockNumber: new Uint256(block.number)
      })
    })

    provider.getBlock('latest').then((block) => {
      if (this.state.blockNumber !== null) {
        return
      }
      this.setState({
        blockNumber: Uint256.fromNumberString(10, block.number.toString())
      })
    })
  }

  render() {
    const blockNumberText = (this.props.blockNumber === null)
      ? ''
      : this.props.blockNumber.toNumberString(10)

    return (
      <div className="flex-columns centiprices-row" style={{
        opacity: this.getOpacity()
      }}>
        <div className="block-number">
          #{ blockNumberText }
        </div>
        <div className="block-centiprices flex-grow text-right">
          <CentipricesComponent
            buyyCentiprice={ this.state.buyyCentiprice }
            sellCentiprice={ this.state.sellCentiprice }
            />
        </div>

      </div>
    )
  }

  private getOpacity(): number {
    if (this.props.blockNumber === null) {
      return .1
    }
    if (this.state.blockNumber === null) {
      return .1
    }
    const diff = this.state.blockNumber.toNumber() - this.props.blockNumber.toNumber() + 2
    if (diff === 0) {
      return 1
    }
    if (diff === -1 || diff === 1) {
      return .5
    }
    return .2
  }

  componentDidUpdate() {
    this.maybeLinkCentipriceSnowdropPair()
  }
  maybeLinkCentipriceSnowdropPair() {
    if (this.isCentipriceSnowdropPairLinked === true) {
      return
    }
    if (this.props.blockNumber === null) {
      return
    }
    this.isCentipriceSnowdropPairLinked = true
    const centipriceSnowdropPair = this.props.bopManager.getCentipriceSnowdropPair(this.props.blockNumber)
    centipriceSnowdropPair.buyy.addHandle((centiprice) => {
      this.setState({ buyyCentiprice: centiprice })
    })
    centipriceSnowdropPair.sell.addHandle((centiprice) => {
      this.setState({ sellCentiprice: centiprice })
    })
  }
}


export class CentipricesGroupComponent extends React.Component<{
  bopManager: BopManager
}, {
  lowestBlockNumber: Uint256 | null,
  blockNumber: Uint256 | null
}> {

  private readonly centipriceRowElementsByBlockNumberString: {
    [blockNumberString: string]: JSX.Element
  } = {}

  constructor(props) {
    super(props)
    this.state = { lowestBlockNumber: null, blockNumber: null }

    provider.getBlock('latest').then((block) => {
      const blockNumber = Uint256.fromNumberString(10, block.number.toString())
      this.setState({ lowestBlockNumber: blockNumber })
      console.log(this.state)
      if (this.state.blockNumber === null) {
        this.setState({ blockNumber })
      }
    })
    bellflower.blockSnowdrop.addHandle((block) => {
      const blockNumber = new Uint256(block.number)
      this.setState({ blockNumber })

      if (this.state.lowestBlockNumber !== null) {
        const diff = this.state.blockNumber.toNumber() - this.state.lowestBlockNumber.toNumber()
        if (diff > 3) {
          this.setState({
            lowestBlockNumber: this.state.blockNumber.opSub(3)
          })
        }
      }
    })
  }

  render() {
    if (this.state.lowestBlockNumber === null) {
      return null
    }
    if (this.state.blockNumber === null) {
      return null
    }
    return (
      <div className="centiprices-group">
        <div className="centiprice-rows" style={{
          marginTop: this.getMarginTop()
        }}>
          { this.getCentipriceRowElements() }
        </div>
      </div>
    )
  }

  private getMarginTop(): number | string {
    const centipriceRowElementsCount = this.getCentipriceRowElementsCount()
    if (centipriceRowElementsCount <= 5) {
      return 0
    } else {
      return `-${centipriceRowElementsCount - 5}em`
    }
  }

  private getCentipriceRowElementsCount(): number {
    if (this.state.lowestBlockNumber === null) {
      return 0
    }
    if (this.state.blockNumber === null) {
      return 0
    }
    return (
      this.state.blockNumber.toNumber()
      - this.state.lowestBlockNumber.toNumber()
      + 5
    )
  }

  private getCentipriceRowElements(): JSX.Element[] | null {
    if (this.state.lowestBlockNumber === null) {
      return null
    }
    if (this.state.blockNumber === null) {
      return null
    }
    const centipriceRowElements: JSX.Element[] = []
    for (let i = 0; i <= this.getCentipriceRowElementsCount(); i++) {
      const blockNumber = this.state.lowestBlockNumber.opAdd(i)
      centipriceRowElements.push(
        this.getCentipriceRowElement(blockNumber)
      )
    }
    return centipriceRowElements
  }

  private getCentipriceRowElement(blockNumberUintable: Uintable): JSX.Element {
    const blockNumber = new Uint256(blockNumberUintable)
    const blockNumberString = blockNumber.toNumberString(10)
    if (this.centipriceRowElementsByBlockNumberString[blockNumberString] === undefined) {
      this.centipriceRowElementsByBlockNumberString[blockNumberString] = (
        <CentipricesRowComponent
          key={ blockNumberString }
          blockNumber={ blockNumber }
          bopManager={ this.props.bopManager }/>
      )
    }
    return this.centipriceRowElementsByBlockNumberString[blockNumberString]
  }

}
