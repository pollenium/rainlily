import * as React from 'react'

interface Props {
  icon: string
}

export class LinearIconComponent extends React.Component<Props> {
  render() {
    return (
      <span className={`lnr lnr-${this.props.icon}`}></span>
    )
  }
}
