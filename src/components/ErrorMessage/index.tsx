import * as React from 'react'
import { LinearIconComponent } from '../LinearIcon'
import './index.scss'
import classNames from 'classnames'
import { Snowdrop } from 'pollenium-snowdrop'



export class ErrorMessageComponent extends React.Component<{
  errorMessage: string | JSX.Element | null
}> {

  render() {
    if (this.props.errorMessage === null) {
      return null
    }
    return (<div className="error-message">
      { this.props.errorMessage }
    </div>)
  }

}
