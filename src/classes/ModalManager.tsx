import { Snowdrop } from 'pollenium-snowdrop'
import * as React from 'react'

export interface ModalStruct {
  title: string | null,
  element: JSX.Element
}

export class ModalManager {

  readonly modalStructSnowdrop = new Snowdrop<ModalStruct>()

  constructor() {
    this.modalStructSnowdrop.emit({
      title: 'x',
      element: (<div>XYZ</div>)
    })
  }

}
