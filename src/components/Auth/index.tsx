import * as React from 'react'
import { OptionsComponent, OptionStruct } from '../Options'
import { DividerComponent } from '../Divider'
import { PasswordInputGroupComponent } from '../PasswordInputGroup'
import { AuthCreateComponent } from '../AuthCreate'
import { AuthLoginComponent } from '../AuthLogin'
import { SquareComponent } from '../Square'
import { PromptComponent } from '../Prompt'

enum SubsectionName {
  NULL = 'null',
  YES = 'yes',
  NO = 'no'
}

export class AuthComponent extends React.Component<{}, { subsectionName: SubsectionName }> {

  constructor(props) {
    super(props)
    this.state = { subsectionName: SubsectionName.NULL }
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
      <div className="auth">
        <div className="pad-horizontal-if-narrow">
          <PromptComponent
            label="Do you have an account?"
            optionStructs={ optionStructs }
            optionId={ this.state.subsectionName }
          />
        </div>
        <SquareComponent/>
        { this.getSubsectionElement() }
      </div>
    )
  }

  getSubsectionElement(): JSX.Element | null {
    switch(this.state.subsectionName) {
      case SubsectionName.NULL:
        return null
      case SubsectionName.YES:
        return (<div>
          <AuthLoginComponent  onLoginButtonClick={ this.onLoginButtonClick.bind(this) }/>
        </div>)
      case SubsectionName.NO:
        return (<div>
          <AuthCreateComponent onCreated={ this.onCreated.bind(this) }/>
        </div>)

    }
  }

  onCreated(): void {
    this.setState({
      subsectionName: SubsectionName.YES
    })
  }

  onLoginButtonClick(): void {
    alert('Login')
  }

}
