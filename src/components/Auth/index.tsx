import * as React from 'react'
import { OptionsComponent, OptionStruct } from '../Options'
import { DividerComponent } from '../Divider'
import { PasswordGroupComponent } from '../PasswordGroup'
import { AuthCreateComponent } from '../AuthCreate'
import { AuthLoginComponent } from '../AuthLogin'

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
      <div className="auth">
        <div className="pad-horizontal">
          Do you have an account?
            <OptionsComponent
              optionStructs={ optionStructs }
              optionId={ this.state.subsectionName }
            />
        </div>
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
          <DividerComponent/>
          <AuthLoginComponent  onLoginButtonClick={ this.onLoginButtonClick.bind(this) }/>
        </div>)
      case SubsectionName.NO:
        return (<div>
          <DividerComponent/>
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
