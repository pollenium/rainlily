import * as React from 'react'
import { Account } from '../../classes/Account'
import { DividerComponent } from '../Divider'
import { LinearIconComponent } from '../LinearIcon'
import { SquareSmallComponent } from '../SquareSmall'
import { CopyComponent } from '../Copy'
import { AuthComponent } from '../Auth'
import { DaiComponent } from '../Dai'
import { Uint256 } from 'pollenium-buttercup'
import { accountsManager } from '../../globals/accountsManager'
import { dai } from 'pollenium-xanthoceras'
import classNames from 'classnames'
import './index.scss'



export class DaiManagerComponent extends React.Component<{}, {
  account: Account | null,
  attodaiAvailable: Uint256 | null,
  attodaiDepositing: Uint256 | null
}> {

  constructor(props) {
    super(props)
    this.state = {
      account: accountsManager.getAccount(),
      attodaiAvailable: null,
      attodaiDepositing: null
    }

    accountsManager.fetchEngineBalance(dai).then((attodaiAvailable) => {
      this.setState({ attodaiAvailable })
    })

    accountsManager.fetchNativeBalance(dai).then((attodaiDepositing) => {
      this.setState({ attodaiDepositing })
    })

    accountsManager.getEngineBalanceSnowdrop(dai).addHandle((attodaiAvailable) => {
      this.setState({ attodaiAvailable })
    })

    accountsManager.getNativeBalanceSnowdrop(dai).addHandle((attodaiDepositing) => {
      this.setState({ attodaiDepositing })
    })

    accountsManager.accountSnowdrop.addHandle(async (account) => {
      this.setState({
        account,
        attodaiAvailable: await accountsManager.fetchEngineBalance(dai),
        attodaiDepositing: await accountsManager.fetchNativeBalance(dai)
      })
    })

  }

  render() {
    return (
      <div className="container">
        <SquareSmallComponent/>
        <div className="pad-horizontal-if-narrow">
          <div className="text-large">Dai Available: <DaiComponent attodai={ this.state.attodaiAvailable }/></div>
          <SquareSmallComponent/>
          <p>This is the amount of Dai available to trade</p>
        </div>
        <SquareSmallComponent/>
        <DividerComponent/>
        <SquareSmallComponent/>
        <div className="pad-horizontal-if-narrow">
          <div className="text-large">Dai Depositing: : <DaiComponent attodai={ this.state.attodaiDepositing }/></div>
          <SquareSmallComponent/>
          <p>This is the amount of Dai in the process of being deposited. It may take a few minutes for Dai to be available.</p>
        </div>
        <SquareSmallComponent/>
        <DividerComponent/>
        <SquareSmallComponent/>
        <div className="pad-horizontal-if-narrow">
          <div className="text-large">Dai Deposit Address</div>
          <SquareSmallComponent/>
          <CopyComponent text={ this.state.account.keypair.getAddress().uu.toHex() } />
          <SquareSmallComponent/>
          <p>
            Dai sent to this address will be deposited to your account. <b>Do not send any other tokens to this address.</b>
          </p>
        </div>
      </div>
    )
  }
}
