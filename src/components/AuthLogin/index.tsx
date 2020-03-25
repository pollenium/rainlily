import React, { FormEvent } from 'react'
import { OptionsComponent, OptionStruct } from '../Options'
import { DividerComponent } from '../Divider'
import { PasswordInputGroupComponent } from '../PasswordInputGroup'
import { LinearIconComponent } from '../LinearIcon'
import { CopyComponent } from '../Copy'
import { ButtonComponent } from '../Button'
import { SquareComponent } from '../Square'
import { generatePassword } from '../../utils/generatePassword'
import { Uu } from 'pollenium-uvaursi'
import { accountsManager } from '../../globals/accountsManager'

const uuEmpty = new Uu(new Uint8Array())

export class AuthLoginComponent extends React.Component<{ onLoginButtonClick: () => void }, { password: Uu | null }> {

  constructor(props) {
    super(props)
    this.state = { password: null }
  }

  render() {
    return (
      <form className="pad-horizontal-if-narrow" onSubmit= { this.onSubmit.bind(this) }>
        <PasswordInputGroupComponent
          label="Password"
          onPassword={ this.onPassword.bind(this) }
        />
        <div className="pad-top text-right">
          <ButtonComponent
            icon="user"
            main="Login"
            isDisabled={ this.state.password === null }
          />
        </div>
      </form>
    )
  }

  onPassword(password: Uu | null) {
    this.setState({ password })
  }

  onSubmit(event: FormEvent) {
    event.preventDefault()
    this.setState({
      password: uuEmpty
    })
    accountsManager.login(this.state.password)
  }


}
