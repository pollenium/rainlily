import React from 'react';
import ReactDOM from 'react-dom';
import { HotAppComponent } from './App';

const root = document.getElementById('root')
ReactDOM.render(<HotAppComponent/>, root)

declare const module: any;

if (module.hot) {
  module.hot.accept('./App', () => {
    console.log('accepted')
    ReactDOM.render(<HotAppComponent/>, root)
  });
} else {
  console.log('not hot')
}
