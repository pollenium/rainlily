import * as React from 'react'
import { createElement, Component } from 'react';
import { render } from 'react-dom';
import { NavbarPrimaryComponent } from './components/NavbarPrimary'
import { BackgroundGroupComponent } from './components/BackgroundGroup'

import './index.scss';

const e = createElement;

class AppComponent extends Component {
  render() {
    return (
      <div className="full">
        <BackgroundGroupComponent/>
        <div>
          <NavbarPrimaryComponent/>
        </div>
      </div>
    );
  }
}

const domContainer = document.querySelector('#__root__');
render(e(AppComponent), domContainer);
