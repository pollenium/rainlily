import * as React from 'react'
import { Account } from '../../classes/Account'
import { LinearIconComponent } from '../LinearIcon'
import { Uint256, Address } from 'pollenium-buttercup'
import { bellflower } from '../../globals/bellflower'
import { accountsManager } from '../../globals/accountsManager'
import { dai } from 'pollenium-xanthoceras'
import { modalManager } from '../../globals/modalManager'
import { DaiComponent } from '../Dai'
import { ModalId } from '../../classes/ModalManager'
import classNames from 'classnames'
import './index.scss'

export class StatusbarComponent extends React.Component<{},{
  account: Account | null,
  blockIndex: Uint256 | null,
  attodaiAvailable: Uint256 | null,
  modalId: ModalId | null
}> {

  constructor(props) {
    super(props)
    this.state = {
      account: accountsManager.getAccount(),
      attodaiAvailable: accountsManager.getEngineBalance(dai),
      blockIndex: null,
      modalId: null
    }

    modalManager.modalIdSnowdrop.addHandle((modalId) => {
      this.setState({ modalId })
    })

    bellflower.fetchLatestBlockIndex().then((blockIndex) => {
      this.setState({ blockIndex })
    })

    bellflower.blockIndexSnowdrop.addHandle((blockIndex) => {
      if (this.state.blockIndex !== null && this.state.blockIndex.compGt(blockIndex)) {
        return
      }
      this.setState({ blockIndex: blockIndex })
    })

    accountsManager.fetchEngineBalance(dai).then((attodaiAvailable) => {
      this.setState({ attodaiAvailable })
    })

    accountsManager.getEngineBalanceSnowdrop(dai).addHandle((attodaiAvailable) => {
      this.setState({ attodaiAvailable })
    })

    accountsManager.accountSnowdrop.addHandle(async (account) => {
      this.setState({
        account,
        attodaiAvailable: await accountsManager.fetchEngineBalance(dai)
      })
    })

  }

  render() {
    return (
      <div className="statusbar">
        <div className="container pad-small-vertical pad-horizontal-if-narrow flex-columns">
          <div className="width-third">
            Block #{this.state.blockIndex ? this.state.blockIndex.toNumberString(10) : '' }
          </div>
          <div className="width-third">
            { this.getDaiBalanceElement() }
          </div>
          <div
            className={ classNames('flex-grow', 'flex-shrink', 'flex-columns', 'clickable', {
              'text-brighter': this.state.modalId === ModalId.ACCOUNTS
            })}
            onClick={ () => { modalManager.openAccounts() } }>
            <div className="flex-grow flex-shrink">
            </div>
            <div className="flex-grow flex-shrink overflow-ellipsis" style={{ maxWidth: 80 }}>
              {this.state.account ? this.state.account.id : '' }
            </div>
            <div style={{ paddingTop: '.25em' }}>
              <LinearIconComponent icon="user" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  getDaiBalanceElement(): JSX.Element {
    if (!this.state.account) {
      return null
    }
    return (
      <div
        className={ classNames('text-center', 'clickable', {
          'text-brighter': this.state.modalId === ModalId.DAI
        })}
        onClick={ () => { modalManager.openDaiManager() } }>
        Dai Available: <DaiComponent attodai={ this.state.attodaiAvailable } />
      </div>
    )
  }

}
