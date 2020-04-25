import * as React from 'react'
import { LinearIconComponent } from '../LinearIcon'
import { BopType } from '../../BopType'
import classNames from 'classnames'

export class BopTypeComponent extends React.Component<{
  bopType: BopType,
  isSingular?: boolean
}> {
  render() {
    return (<span>
      <span style={{
        fontSize: '.7em',
        paddingRight: '.2em',
        display: 'inline-block' }}>
        <LinearIconComponent icon={ this.props.bopType === BopType.AGREE ? 'thumbs-up2' : 'thumbs-down2' }/>
      </span>{ this.props.bopType === BopType.AGREE ? 'Agree' : 'Disagree' }{ this.props.isSingular ? '' : 's'}
    </span>)
  }
}
