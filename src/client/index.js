import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import Container from './components/container';
import createStore from './redux/index'

const store = createStore();

ReactDOM.render(
    <Provider store={store}>
      <Container />
    </Provider>,
    document.getElementById('root')
);