import React from 'react';
import ReactDOM from 'react-dom';

import { store } from './app/store';
import { Provider } from 'react-redux';

import './index.css';
import List from './features/list/List';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <List />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
