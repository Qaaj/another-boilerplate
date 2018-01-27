import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import Container from './components/container';
import createStore from './redux/index'
import { injectGlobal } from 'styled-components';

const store = createStore();

injectGlobal`
  html,body{
    background-color: #546E7A;
    font-family: Roboto;
  }
`;

ReactDOM.render(
    <Provider store={store}>
      <Container />
    </Provider>,
    document.getElementById('root')
);