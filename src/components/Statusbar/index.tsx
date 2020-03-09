import * as React from 'react'
import { Account } from '../../classes/Account'
import { LinearIconComponent } from '../LinearIcon'
import { Uint256, Address } from 'pollenium-buttercup'
import { bellflower } from '../../globals/bellflower'
import { accountManager } from '../../globals/accountManager'
import { dai } from '../../globals/dai'
import './index.scss'

export class StatusbarComponent extends React.Component<{},{
  account: Account | null,
  blockNumber: Uint256 | null,
  daiBalance: Uint256 | null
}> {

  constructor(props) {
    super(props)
    this.state = {
      account: accountManager.getAccount(),
      daiBalance: accountManager.getEngineBalance(dai),
      blockNumber: null
    }

    bellflower.blockSnowdrop.addHandle((block) => {
      this.setState({
        blockNumber: new Uint256(block.number)
      })
    })

    accountManager.fetchEngineBalance(dai).then((daiBalance) => {
      this.setState({ daiBalance })
    })

    accountManager.accountSnowdrop.addHandle(async (account) => {
      this.setState({
        account,
        daiBalance: await accountManager.fetchEngineBalance(dai)
      })
    })

  }

  render() {
    return (
      <div className="statusbar">
        <div className="container pad-small-vertical pad-horizontal-if-narrow flex-columns">
          <div className="width-third">
            Block #{this.state.blockNumber ? this.state.blockNumber.toNumberString(10) : '' }
          </div>
          <div className="width-third text-center">
            { this.getDaiBalanceElement() }
          </div>
          <div className="flex-grow text-right">
            { this.getAccountElement() }
          </div>
        </div>
      </div>
    )
  }

  getAccountElement(): JSX.Element {
    if (this.state.account === null) {
      return null
    } else {
      return (<span>
        {this.state.account.keypair.getAddress().uu.toHex().substr(0, 8) + '…' }
         <LinearIconComponent icon="user" />
      </span>)
    }
  }

  getDaiBalanceElement(): JSX.Element {
    return (<span>
      Dai Balance ${this.state.daiBalance === null ? '…' : this.state.daiBalance.toNumberString(10) }
    </span>)
  }
}
