import * as React from 'react'
import { OptionsComponent, OptionStruct } from '../Options'
import { DividerComponent } from '../Divider'
import { PasswordGroupComponent } from '../PasswordGroup'
import { LinearIconComponent } from '../LinearIcon'
import { CopyComponent } from '../Copy'
import { ButtonComponent } from '../Button'
import { generatePassword } from '../../utils/generatePassword'
import { Uu } from 'pollenium-uvaursi'

enum SubsectionName {
  NULL = 'null',
  YES = 'yes',
  NO = 'no'
}

export class AuthCreateComponent extends React.Component<{ onCreated: () => void }, { subsectionName: SubsectionName, password: Uu }> {

  constructor(props) {
    super(props)
    this.state = { subsectionName: SubsectionName.NULL, password: new Uu(new Uint8Array()) }
  }

  render() {

    const optionStructs: OptionStruct[] = [
      {
        id: SubsectionName.YES,
        text: 'Yes',
        onSelect: () => {
          this.setState({ subsectionName: SubsectionName.YES })
        }
      },
      {
        id: SubsectionName.NO,
        text: 'No',
        onSelect: () => {
          this.setState({ subsectionName: SubsectionName.NO })
        }
      }
    ]

    return (
      <div className="auth-create">
        <div className="pad-horizontal-if-narrow">
          <OptionsComponent
            label="Do you have a password generator?"
            optionStructs={ optionStructs }
            optionId={ this.state.subsectionName } />
        </div>
        { this.getSubsectionElement() }
      </div>
    )
  }

  onPasswordInputChange(passwordUtf8: string) {
    console.log(passwordUtf8)
    this.setState({
      password: Uu.fromUtf8(passwordUtf8)
    })
  }

  getSubsectionElement(): JSX.Element | null {
    switch(this.state.subsectionName) {
      case SubsectionName.NULL:
        return null
      case SubsectionName.YES:
        return (
          <div>
            <DividerComponent/>
            <form className="pad-top pad-horizontal-if-narrow" onSubmit={ this.props.onCreated }>
              <p className="pad-bottom">Great! Please generate a password with atleast 48 characters. A long random password is necessary to use Rainlily safely.</p>
              <PasswordGroupComponent
                value={ this.state.password.toUtf8() }
                label="Password"
                onValue={ this.onPasswordInputChange.bind(this) }
              />
              <div className="pad-top text-right">
                <ButtonComponent
                  icon="user-plus"
                  text="Create Account"
                  isDisabled={ this.state.password.u.length === 0 }
                />
              </div>
            </form>
          </div>
        )
      case SubsectionName.NO:
        const password = generatePassword()
        console.log(password)
        return (
          <div>
            <DividerComponent/>
            <div className="pad-top pad-horizontal-if-narrow">
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
              text="Create Account"
              onClick={ this.props.onCreated }
            />
            </div>
          </div>
        )
    }
  }

}
