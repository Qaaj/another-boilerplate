import {createStore, applyMiddleware, compose} from 'redux'
import io from 'socket.io-client';
import createSocketIoMiddleware from 'redux-socket.io';

const io_options = {reconnect: true, transports: ['websocket', 'polling']};
const socket = io('http://localhost:3001',io_options);

window.socket = socket;

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