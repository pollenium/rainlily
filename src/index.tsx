// import * as React from 'react'
// import { render } from 'react-dom'
// import { AppComponent } from './App'
// import './index.scss';
// import { AppContainer } from 'react-hot-loader'
//
// render(<AppContainer><AppComponent/></AppContainer>, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import { HotAppComponent } from './App';

const root = document.getElementById('root')
ReactDOM.render(<HotAppComponent/>, root)

// render(AppComponent);
//
declare const module: any;

//
// webpack Hot Module Replacement API
if (module.hot) {
  console.log('hot')
  // keep in mind - here you are configuring HMR to accept CHILDREN MODULE
  // while `hot` would configure HMR for the CURRENT module
  module.hot.accept('./App', () => {
    console.log('accepted')
    // if you are using harmony modules ({modules:false})
    ReactDOM.render(<HotAppComponent/>, root)
    // in all other cases - re-require App manually
    // render(require('./containers/App'));
  });
} else {
  console.log('not hot')
}
