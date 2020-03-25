import * as React from 'react'
import { LinearIconComponent } from '../LinearIcon'
import { DividerComponent } from '../Divider'
import { modalManager } from '../../globals/modalManager'
import classNames from 'classnames'
import './index.scss'

export class ModalComponent extends React.Component<{}, {
    title: string | null,
    isOpen: boolean,
    mainElement: JSX.Element | null
  }
> {

  constructor(props) {
    super(props)
    this.state = {
      title: null,
      isOpen: false,
      mainElement: null
    }

    modalManager.modalStructSnowdrop.addHandle((modalStruct) => {
      this.setState({
        ...modalStruct,
        isOpen: true
      })
    })

  }

  render() {
    return (
      <div className={ classNames('modal', { 'display-none': !this.state.isOpen } )}>
        <div className="container text-bright">
          <div className="flex-columns pad-vertical pad-horizontal-if-narrow text-large">
            <div className="flex-grow">
              { this.getTitleElement() }
            </div>
            <div className="text-right clickable text-medium" onClick={ this.close.bind(this) }>
              <span>Close</span>
              <span className="display-inline-block" style={{ marginBottom: -4 }}>
                <LinearIconComponent icon="cross"/>
              </span>
            </div>
          </div>
        </div>
        <DividerComponent/>
        { this.state.mainElement }
      </div>
    )
  }

  getTitleElement(): JSX.Element {
    if (this.state.title === null) {
      return null
    }
    return <span>{this.state.title}</span>
  }

  close() {
    this.setState({ isOpen: false })
    modalManager.modalCloseSnowdrop.emit()
  }

}
