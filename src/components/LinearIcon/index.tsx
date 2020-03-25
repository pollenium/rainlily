import * as React from 'react'
import classNames from 'classnames'

export class LinearIconComponent extends React.Component<{
  icon: string,
  align?: 'left' | 'right'
}> {
  render() {
    return (
      <div className="display-inline-block position-relative" style={{
        height: '1em',
        width: '1.25em',
        textAlign: this.props.align ? this.props.align : 'center',
      }}>
        <div className={ classNames('lnr', `lnr-${this.props.icon}`) }></div>
      </div>
    )
  }
}
