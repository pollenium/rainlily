import * as React from 'react'
import { LinearIconComponent } from '../LinearIcon'
import classNames from 'classnames'
import { Snowdrop } from 'pollenium-snowdrop'
import { OptionStruct, OptionsComponent } from '../Options'
import './index.scss'

export class PromptComponent extends React.Component<{
  label: string | JSX.Element,
  optionStructs: OptionStruct[],
  optionId?: string
}> {

  private readonly optionIdSnowdrop = new Snowdrop<string>()

  render() {

    return (
      <div className="prompt">
        <div className="label">{this.props.label}</div>
        <OptionsComponent optionId={ this.props.optionId } optionStructs={ this.props.optionStructs } />
      </div>
    )
  }
}
