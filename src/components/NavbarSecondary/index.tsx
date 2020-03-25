import * as React from 'react'
import { OptionsComponent, OptionStruct } from '../Options'
import './index.scss'

export class NavbarSecondaryComponent extends React.Component<{
  optionStructs: OptionStruct[],
  optionId?: string
}> {

  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  render() {

    return (
      <div className="navbar-secondary bg-medium bg-glass position-relative">
        <div className="container pad-horizontal-if-narrow pad-small-vertical">
          <OptionsComponent
            optionStructs={ this.props.optionStructs }
            optionId={ this.props.optionId }
          />
        </div>
        <div className="shadow position-absolute" style={{
          bottom: 0,
          left: -4,
          right: -4,
          height: 12,
          zIndex: 100
        }}></div>
      </div>
    )
  }
}
