import * as React from 'react'
import { OptionsComponent, OptionStruct } from '../Options'
import { DividerComponent } from '../Divider'
import { PasswordGroupComponent } from '../PasswordGroup'
import { LinearIconComponent } from '../LinearIcon'
import { CopyComponent } from '../Copy'
import { ButtonComponent } from '../Button'
import { generatePassword } from '../../utils/generatePassword'
import { Uu } from 'pollenium-uvaursi'
import { accountsManager } from '../../globals/accountsManager'

const uuEmpty = new Uu(new Uint8Array())

export class AuthLoginComponent extends React.Component<{ onLoginButtonClick: () => void }, { password: Uu }> {

  constructor(props) {
    super(props)
    this.state = { password: uuEmpty }
  }

  render() {
    return (
      <div>
        <DividerComponent/>
        <form className="pad-top pad-horizontal-if-narrow" onSubmit= { this.onSubmit.bind(this) }>
          <PasswordGroupComponent
            label="Password"
            value = { this.state.password.toUtf8() }
            onValue={ this.onPasswordInputChange.bind(this) }
          />
          <div className="pad-top text-right">
            <ButtonComponent
              icon="user"
              text="Login"
              isDisabled={ this.state.password.u.length === 0 }
            />
          </div>
        </form>
      </div>
    )
  }

  onPasswordInputChange(passwordUtf8: string) {
    this.setState({
      password: Uu.fromUtf8(passwordUtf8)
    })
  }0

  onSubmit(e) {
    e.preventDefault()
    this.setState({
      password: uuEmpty
    })
    accountsManager.login(this.state.password)
  }


}
