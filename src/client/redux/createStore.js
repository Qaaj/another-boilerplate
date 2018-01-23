import {createStore, applyMiddleware, compose} from 'redux'
import io from 'socket.io-client';
import createSocketIoMiddleware from 'redux-socket.io';

const io_options = {reconnect: true, transports: ['websocket', 'polling']};
const socket = io('wss://api.bitfinex.com/ws/2',io_options);

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