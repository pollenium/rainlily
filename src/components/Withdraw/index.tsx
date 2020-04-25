import React, { FormEvent } from 'react'
import { AddressInputGroupComponent } from '../AddressInputGroup'
import { DaiInputGroupComponent } from '../DaiInputGroup'
import { SquareComponent } from '../Square'
import { Address, Uint256, Uintable } from 'pollenium-buttercup'
import { DaiComponent } from '../Dai'
import { ButtonComponent } from '../Button'
import { accountsManager } from '../../globals/accountsManager'
import { notificationsManager } from '../../globals/notificationsManager'
import { e18Bignumber } from '../../globals/e18Bignumber'
import { dai } from 'pollenium-xanthoceras'
import { dianthusClient } from '../../globals/dianthusClient'
import { engineReader } from '../../globals/engineReader'
import { genEpoch } from '../../lib/genEpoch'
import { MINUTE_S } from 'pollenium-ursinia'
import { Uu, Uish } from 'pollenium-uvaursi'
import { Theme } from '../../Theme'
import { Snowdrop } from 'pollenium-snowdrop'

export class WithdrawComponent extends React.Component<{}, {
  to: Address| null,
  amount: Uint256 | null
}> {

  private readonly toInSnowdrop = new Snowdrop<Uish | null>()
  private readonly amountInSnowdrop = new Snowdrop<Uintable | null>()

  constructor(props) {
    super(props)
    this.state = {
      to: null,
      amount: null
    }
  }

  render(): JSX.Element {
    return (
      <form onSubmit={ this.onSubmit.bind(this) }>
        <AddressInputGroupComponent
          label="Withdrawl Address"
          onAddress={ this.onAddress.bind(this) }
          addressInSnowdrop={ this.toInSnowdrop }
        />
        <SquareComponent/>
        <DaiInputGroupComponent
          label="Withdrawl Amount"
          onAttodai={ this.onAttodai.bind(this) }
          validates={ [this.validateLessThanAvailable.bind(this)] }
          attodaiInSnowdrop={ this.amountInSnowdrop }
        />
        <SquareComponent/>
        <div className="text-right">
          <ButtonComponent
            icon="exit-right"
            main="Start Withdrawl"
            isDisabled={ this.state.to === null || this.state.amount === null }
            />
        </div>
      </form>
    )
  }

  onAddress(to: Address | null) {
    this.setState({ to })
  }

  onAttodai(amount: Uint256 | null) {
    this.setState({ amount })
  }

  async onSubmit(event: FormEvent) {
    event.preventDefault()
    notificationsManager.queueNotification({
      theme: Theme.INFO,
      main: <span>Withdrawl of <DaiComponent attodai={ this.state.amount }/> initiated</span>
    })
    dianthusClient.genAndUploadWithdrawRequest({
      fromPrivateKey: accountsManager.getAccount().keypair.privateKey,
      to: this.state.to,
      token: dai,
      amount: this.state.amount,
      expiration: genEpoch() + (10 * MINUTE_S),
      nonce: Uu.genRandom(32),
      actionSalt: await engineReader.fetchWithdrawSalt()
    }).catch((error) => {
      notificationsManager.queueNotification({
        theme: Theme.ERROR,
        main: `WITHDRAW Failed: ${error.message}`
      })
    })
    this.toInSnowdrop.emit(null)
    this.amountInSnowdrop.emit(null)
  }

  async validateLessThanAvailable(value: string) {
    const amountBignumber = e18Bignumber.times(value)
    const amount = Uint256.fromNumberString(10, amountBignumber.toString())
    const available = await accountsManager.fetchEngineBalance(dai)
    if (amount.compLte(available)) {
      return null
    } else {
      return (<span>
        Cannot withdraw <DaiComponent attodai={ amount } />, only <DaiComponent attodai={ available } /> available
      </span>)
    }
  }


}
