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

export class AuthLoginComponent extends React.Component<{ onLoginButtonClick: () => void }, { password: Uu }> {

  constructor(props) {
    super(props)
    this.state = { password: new Uu(new Uint8Array()) }
  }

  render() {
    return (
      <div>
        <DividerComponent/>
        <form className="pad" onSubmit= { this.onSubmit.bind(this) }>
          <PasswordGroupComponent
            label="Password"
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
    console.log('login')
    accountsManager.login(this.state.password)
  }


}
