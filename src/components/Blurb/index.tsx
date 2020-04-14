import * as React from 'react'
import { LinearIconComponent } from '../LinearIcon'
import './index.scss'
import classNames from 'classnames'

export class BlurbComponent extends React.Component<{ main: string | JSX.Element }> {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='blurb'>
        { this.props.main }
      </div>
    )
  }
}
