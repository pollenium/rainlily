import classNames from 'classnames'
import * as React from 'react'

export class CentipriceComponent extends React.Component<{ centiprice: number | null }, { centiprice: number | null }> {

  private intervalId: number | null = null

  constructor(props) {
    super(props)
    this.state = { ... props }
  }
  render() {
    const innerText = this.state.centiprice ? `${this.state.centiprice}¢` : '---'
    return (
      <span className={ classNames({'text-muted': this.state.centiprice === null}) }>{innerText}</span>
    )
  }
  componentDidUpdate(prevProps) {
    if (prevProps.centiprice === this.props.centiprice) {
      return
    }

    if (this.intervalId !== null) {
      this.clearInterval()
    }

    if (this.props.centiprice === null || this.state.centiprice === null) {
      this.setState({ centiprice: this.props.centiprice })
      return
    }

    this.intervalId = setInterval(() => {
      if (this.props.centiprice === this.state.centiprice) {
        this.clearInterval()
        return
      }

      if (this.props.centiprice > this.state.centiprice) {
        this.setState({ centiprice: this.state.centiprice + 1})
        return
      }

      if (this.props.centiprice < this.state.centiprice) {
        this.setState({ centiprice: this.state.centiprice - 1})
        return
      }
    }, 200) as number
  }

  clearInterval() {
    clearInterval(this.intervalId)
    this.intervalId = null
  }
}
