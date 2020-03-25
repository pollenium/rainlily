import * as React from 'react'
import { LinearIconComponent } from '../LinearIcon'
import classNames from 'classnames'

export class BopComponent extends React.Component<{
  type: 'Agree' | 'Disagree'
  isPlural?: boolean
}> {
  render() {
    return (<span>
      <span style={{
        fontSize: '.7em',
        paddingRight: '.4em',
        height: '100%',
        paddingBottom: this.props.type === 'Agree' ? '.05em' : 0,
        display: 'inline-block' }}>
        <LinearIconComponent icon={ this.props.type === 'Agree' ? 'thumbs-up2' : 'thumbs-down2' }/>
      </span>
      { this.props.type }
    </span>)
  }
}
