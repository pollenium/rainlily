import * as React from 'react'
import { LinearIconComponent } from '../LinearIcon'
import classNames from 'classnames'
import { Snowdrop } from 'pollenium-snowdrop'
import './index.scss'

export interface OptionStruct {
  id: string,
  text: string,
  onSelect: () => void,
}

interface OptionProps {
  struct: OptionStruct,
  optionIdSnowdrop: Snowdrop<string>,
  isSelected: boolean
}

interface OptionState {
  text: string,
}

export class OptionComponent extends React.Component<OptionProps, OptionState> {

  constructor(props: OptionProps) {
    super(props)
    this.state = {
      ...props.struct
    }

    if (this.props.isSelected) {
      props.struct.onSelect()
    }
  }

  render() {
    return (
      <div
        className = { classNames(
          'option',
          'cursor-pointer',
          { selected: this.props.isSelected })
        }
        onClick = { this.onClick.bind(this) }
        >
        { this.state.text }
      </div>
    )
  }

  onClick() {
    if (this.props.isSelected) {
      return
    }
    this.props.optionIdSnowdrop.emit(this.props.struct.id)
    this.props.struct.onSelect()
  }
}

export class OptionsComponent extends React.Component<{
  label?: string,
  optionStructs: OptionStruct[],
  optionId?: string
}, {
  optionId?: string
}> {

  private readonly optionIdSnowdrop = new Snowdrop<string>()

  constructor(props) {
    super(props)
    this.state = { ...props }
    this.optionIdSnowdrop.addHandle((optionId) => {
      this.setState({ optionId })
    })
  }

  render() {

    const optionComponents = this.props.optionStructs.map((optionStruct, index) => {
      return (
        <OptionComponent
          key={ index }
          struct={ optionStruct }
          optionIdSnowdrop={ this.optionIdSnowdrop }
          isSelected={ this.state.optionId === optionStruct.id } />
      )
    })

    return (
      <div className="options">
        <div className="flex-columns">
          { this.getLabelElement() }
          { optionComponents }
        </div>
      </div>
    )
  }

  getLabelElement(): JSX.Element {
    if (!this.props.label) {
      return null
    }
    return (<div className="display-inline-block pad-vertical pad-right">{this.props.label}</div>)
  }
}
