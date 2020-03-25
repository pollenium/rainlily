import * as React from 'react'
import { LinearIconComponent } from '../LinearIcon'
import './index.scss'
import classNames from 'classnames'
import { Snowdrop } from 'pollenium-snowdrop'

export type InputGroupValidate = (value: string) => Promise<string | null>
export type InputGroupValidates = InputGroupValidate[]

export interface InputGroupProps {
  type: 'text' | 'password' | 'number',
  label?: string | JSX.Element,
  prepend?: string | JSX.Element,
  append?: string | JSX.Element,
  onValue: (value: string | null) => void,
  validates?: InputGroupValidates,
  valueInSnowdrop?: Snowdrop<string | null>
}

export interface InputGroupState {
  isActive: boolean,
  errorMessage: string | null
}

export class InputGroupComponent extends React.Component<InputGroupProps, InputGroupState> {

  private input: HTMLInputElement

  constructor(props) {
    super(props)
    this.state = {
      isActive: false,
      errorMessage: null
    }

    if (props.valueInSnowdrop) {
      props.valueInSnowdrop.addHandle((value) => {
        if (value === null) {
          this.input.value = ''
        } else {
          this.input.value = value
        }
      })
    }
  }

  render() {
    return (
      <div className={
        classNames('input-group', {
          active: this.state.isActive,
          invalid: this.state.errorMessage !== null
        })
      }>
        { this.getLabelElement() }
        <div className="main flex-columns">
          { this.getPrependElement() }
          <div className="flex-grow">
            <input
              type={ this.props.type }
              className="input full"
              onFocus={ this.onInputFocus.bind(this) }
              onBlur={ this.onInputBlur.bind(this) }
              onInput={ this.onInputInput.bind(this) }
              ref={ (input) => { this.input = input}}
            />
          </div>
          { this.getAppendElement() }
        </div>
        { this.getErrorMessageElement() }
      </div>
    )
  }

  getLabelElement(): JSX.Element | null {
    if (this.props.label === undefined) {
      return null
    }
    return (<div className="pad-small-bottom">{ this.props.label }</div>)
  }

  getPrependElement(): JSX.Element | null {
    if (this.props.prepend === undefined) {
      return null
    }
    return (<div>
      { this.props.prepend }
    </div>)
  }

  getAppendElement(): JSX.Element | null {
    if (this.props.append === undefined) {
      return null
    }
    return (<div>
      { this.props.append }
    </div>)
  }

  getErrorMessageElement(): JSX.Element | null {
    if (this.state.errorMessage === null) {
      return null
    }
    return (<div className="error-message">
      { this.state.errorMessage }
    </div>)
  }

  onInputFocus() {
    this.setState({ isActive: true })
  }

  onInputBlur() {
    this.setState({ isActive: false })
  }

  async onInputInput() {

    const value = this.input.value

    if (this.props.validates && this.props.validates.length > 0) {
      for (let i = 0; i < this.props.validates.length; i++) {
        const validate = this.props.validates[i]
        const errorMessage = await validate(value)
        if (errorMessage !== null) {
          this.setState({ errorMessage })
          if (this.props.onValue) {
            this.props.onValue(null)
          }
          return
        }
      }
    }

    this.setState({ errorMessage: null })
    this.props.onValue(value)
  }

}
