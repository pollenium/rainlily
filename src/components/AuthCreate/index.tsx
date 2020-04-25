import React, { FormEvent } from 'react'
import { OptionsComponent, OptionStruct } from '../Options'
import { DividerComponent } from '../Divider'
import { PasswordInputGroupComponent } from '../PasswordInputGroup'
import { LinearIconComponent } from '../LinearIcon'
import { CopyComponent } from '../Copy'
import { ButtonComponent } from '../Button'
import { SquareComponent } from '../Square'
import { generatePassword } from '../../lib/generatePassword'
import { Uu } from 'pollenium-uvaursi'
import { PromptComponent } from '../Prompt'

enum SubsectionName {
  NULL = 'null',
  YES = 'yes',
  NO = 'no'
}

export class AuthCreateComponent extends React.Component<{ onCreated: () => void }, { subsectionName: SubsectionName, password: Uu | null }> {

  constructor(props) {
    super(props)
    this.state = { subsectionName: SubsectionName.NULL, password: null }
  }

  render() {

    const optionStructs: OptionStruct[] = [
      {
        id: SubsectionName.YES,
        main: 'Yes',
        onSelect: () => {
          this.setState({ subsectionName: SubsectionName.YES })
        }
      },
      {
        id: SubsectionName.NO,
        main: 'No',
        onSelect: () => {
          this.setState({ subsectionName: SubsectionName.NO })
        }
      }
    ]

    return (
      <div className="auth-create">
        <div className="pad-horizontal-if-narrow">
          <PromptComponent
            label="Do you have a password generator?"
            optionStructs={ optionStructs }
            optionId={ this.state.subsectionName } />
        </div>
        <SquareComponent/>
        { this.getSubsectionElement() }
      </div>
    )
  }

  onPassword(password: Uu | null) {
    this.setState({ password })
  }

  onSubmit(event: FormEvent) {
    event.preventDefault()
    this.props.onCreated()
  }

  getSubsectionElement(): JSX.Element | null {
    switch(this.state.subsectionName) {
      case SubsectionName.NULL:
        return null
      case SubsectionName.YES:
        return (
          <form className="pad-horizontal-if-narrow" onSubmit={ this.onSubmit.bind(this) }>
            <PasswordInputGroupComponent
              label="Great! Please generate a password with atleast 48 characters. A long random password is necessary to use Rainlily safely."
              onPassword={ this.onPassword.bind(this) }
            />
            <SquareComponent/>
            <div className="text-right">
              <ButtonComponent
                icon="user-plus"
                main="Create Account"
                isDisabled={ this.state.password === null }
              />
            </div>
          </form>
        )
      case SubsectionName.NO:
        const password = generatePassword()
        return (
          <div>
            <div className="pad-horizontal-if-narrow">
              <p className="pad-bottom">
                No worries! Rainlily requires every user to have a unique, random password. We've generated one for you.
              </p>
              <p className="pad-bottom">
                Save it somewhere safe! There is no way to change or reset it.
              </p>
              <CopyComponent text={ password.toUtf8() }/>
            </div>
            <div className="pad text-right">
            <ButtonComponent
              icon="user-plus"
              main="Create Account"
              onClick={ this.props.onCreated }
            />
            </div>
          </div>
        )
    }
  }

}
