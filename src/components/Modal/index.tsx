import * as React from 'react'
import { modalManager } from '../../globals/modalManager'
import classNames from 'classnames'
import './index.scss'

export class ModalComponent extends React.Component<{}, {
    title: string | null,
    isOpen: boolean
  }
> {

  constructor(props) {
    super(props)
    this.state = {
      title: null,
      isOpen: false
    }

    modalManager.modalStructSnowdrop.addHandle((modalStruct) => {
      this.setState({
        isOpen: true,
        title: modalStruct.title
      })
    })
  }

  render() {
    return (
      <div className={ classNames('modal', { open: this.state.isOpen} )}>
        <div className="container pad-top">
          { this.getTitleElement() }
        </div>
      </div>
    )
  }

  getTitleElement(): JSX.Element {
    if (this.state.title === null) {
      return null
    }
    return <div className="pad-horizontal-if-narrow">{this.state.title}</div>
  }

}
