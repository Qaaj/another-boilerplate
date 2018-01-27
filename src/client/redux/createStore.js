import {createStore, applyMiddleware, compose} from 'redux'
import socket from '../services/socket';
import createSocketIoMiddleware from 'redux-socket.io';

let socketIoMiddleware = createSocketIoMiddleware(socket, "");

// creates the store
export default (rootReducer, rootSaga) => {

  const middleware = []
  const enhancers = []

  middleware.push(socketIoMiddleware)

  enhancers.push(applyMiddleware(...middleware))

  const store = createStore(rootReducer, {}, compose(...enhancers))

  return store
}