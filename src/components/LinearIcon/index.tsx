import * as React from 'react'
import classNames from 'classnames'

interface Props {
  icon: string
}

export class LinearIconComponent extends React.Component<Props> {
  render() {
    return (
      <div className="display-inline-block position-relative" style={{ height: '1.25em', width: '1.25em', padding: '.125em' }}>
        <div className={ classNames('lnr', `lnr-${this.props.icon}`) }></div>
      </div>
    )
  }
}
