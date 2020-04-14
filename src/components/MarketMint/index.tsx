import * as React from 'react'
import Bignumber from 'bignumber.js'
import { OptionStruct } from '../Options'
import { PromptComponent } from '../Prompt'
import { DividerComponent } from '../Divider'
import { ButtonComponent } from '../Button'
import { Market } from '../../classes/Market'
import { BopManager } from '../../classes/BopManager'
import { BopTypeComponent } from '../BopType'
import { OrderDirectionComponent } from '../OrderDirection'
import { AuthComponent } from '../Auth'
import { SquareComponent } from '../Square'
import { DaiInputGroupComponent } from '../DaiInputGroup'
import { AmountInputGroupComponent } from '../AmountInputGroup'
import { ErrorMessageComponent } from '../ErrorMessage'
import { DaiComponent } from '../Dai'
import { Uint256 } from 'pollenium-buttercup'
import { Account } from '../../classes/Account'
import { OrderDirection } from 'pollenium-alchemilla'
import { OrderRequest } from '../../classes/OrderRequest'
import { Theme } from '../../Theme'
import { BopType } from '../../BopType'
import { Uu } from 'pollenium-uvaursi'
import { genEpoch } from '../../utils/genEpoch'
import { dai } from 'pollenium-xanthoceras'
import { accountsManager } from '../../globals/accountsManager'
import { notificationsManager } from '../../globals/notificationsManager'
import { bellflower } from '../../globals/bellflower'
import { engineReader } from '../../globals/engineReader'
import { anemoneClient } from '../../globals/anemoneClient'
import { applicationId } from '../../globals/applicationId'
import { e18 } from '../../globals/e18'
import { dianthusClient } from '../../globals/dianthusClient'
import { MINUTE_S } from 'pollenium-ursinia'
import './index.scss'

export class MarketMintComponent extends React.Component<
  { market: Market },
  {
    amount: Uint256 | null,
    errorMessage: string | JSX.Element | null,
    isSubmittable: boolean
  }
> {
  constructor(props) {
    super(props)
    this.state = {
      amount: null,
      isSubmittable: false,
      errorMessage: null
    }
  }

  render() {

    return (<form onSubmit={ this.onSubmit.bind(this) }>
      <SquareComponent/>
      <div>
        <AmountInputGroupComponent
          label={ <span>How many <BopTypeComponent bopType={ BopType.AGREE }/> and <BopTypeComponent bopType={ BopType.DISAGREE }/> would you like to mint?</span> }
          onAmount={ this.onAmount.bind(this) }
          isAutofocus={ true }
          />
        <SquareComponent/>
        <ErrorMessageComponent errorMessage={ this.state.errorMessage }/>
        <div className="text-right pad-horizontal">
          <ButtonComponent
            icon="plus-circle"
            main="Mint"
            isDisabled={ !this.state.isSubmittable }
          />
        </div>
      </div>
    </form>)
  }

  onAmount(amount: Uint256) {
    this.setState({ amount })
  }


  async onSubmit(event) {
    event.preventDefault()
    notificationsManager.queueNotification({
      theme: Theme.INFO,
      main: 'Mint initated'
    })

    this.setState({ amount: null })

    console.log('overseer', this.props.market.overseer.uu.toHex())

    dianthusClient.genAndUploadWithdrawAndNotifyRequest({
      fromPrivateKey: accountsManager.getAccount().keypair.privateKey,
      to: this.props.market.overseer,
      token: dai,
      amount: this.state.amount.opMul(e18),
      expiration: genEpoch() + (10 * MINUTE_S),
      nonce: Uu.genRandom(32),
      actionSalt: await engineReader.fetchWithdrawAndNotifySalt()
    })
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      this.state.amount !== nextState.amount
    ) {
      nextState.errorMessage = null
      nextState.isSubmittable = false
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.amount === prevState.amount
    ) {
      return
    }

    if (
      this.state.amount !== null
    ) {
      const balance = await accountsManager.fetchEngineBalance(dai)
      const cost = this.state.amount.opMul(e18)
      if (cost.compGt(balance)) {
        this.setState({
          errorMessage: (<span>
            Cannot mint { this.state.amount.toNumberString(10) }. That will cost <DaiComponent attodai={ cost }/> and you only have <DaiComponent attodai={ balance }/>
          </span>)
        })
        return
      }
    }

    if (this.state.amount !== null) {
      this.setState({
        isSubmittable: true
      })
    }

  }

}
