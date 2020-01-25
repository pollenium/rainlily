import * as React from 'react'
import { LinearIconComponent } from '../LinearIcon'
import './index.scss'

export class NavbarPrimaryComponent extends React.Component {
  render() {
    return (
      <div className="navbar-primary bg-dark bg-medium bg-glass">
        <div className="container pad flex-columns">
          <div className="navbar-primary-flank"></div>
          <div className="flex-grow text-center">
            Rainlily
          </div>
          <div className="navbar-primary-flank">
            <LinearIconComponent icon="user" />
            <LinearIconComponent icon="cog" />
          </div>
        </div>
      </div>
    )
  }
}
