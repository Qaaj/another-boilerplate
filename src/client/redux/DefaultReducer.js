import {createReducer, createActions} from 'reduxsauce'
import {fromJS} from 'immutable'
import socket from '../services/socket';

import updateOrderbook from '../helpers/orderbook';

const {Types, Creators} = createActions({
  trades: ['data'],
  book: ['data'],
  connection: [],
})


export const INITIAL_STATE = fromJS({
  trades: [],
  bids: {},
  asks: {},
  connected: true,
});


export const handleConnection = (state) => {
  if (socket.connected) {
    socket.disconnect();
    return state.set('connected', false);
  } else {
    socket.connect();
    return state.set('connected', true);
  }
  return state;
}

export const showTrades = (state, {data}) => {
  let newTrades = [data[1]];

  // Initial bulkload
  if (Array.isArray(data[0])) newTrades = data[0];

  let trades = state.get('trades').toJS();

  newTrades.forEach(trade => {
    var dt = new Date(0);
    dt.setUTCSeconds(trade[1] / 1000);
    const timestamp =dt.toISOString().substr(11, 8);
    const price = trade[3];
    const change = trade[2]
    trades.unshift({
      timestamp,
      price,
      change
    });

    if (trades.length > 25) trades.pop();
  });

  return state.set('trades', fromJS(trades));
}

export const showBook = (state, {data}) => {


  let newOrders = [data[0]]

  // Initial bulkload
  if (Array.isArray(data[0][0])) {
    newOrders = data[0]
  }

  newOrders.forEach(orderData => {
    const price = orderData[0];
    const orders = orderData[1];
    const amount = orderData[2];
    const bid = amount > 0;

    const order = {price, amount: Math.abs(amount), orders, bid};

    state = updateOrderbook(state, order);
  })


  return state;
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TRADES]: showTrades,
  [Types.BOOK]: showBook,
  [Types.CONNECTION]: handleConnection,
})

export const PriceTypes = Types;
export default Creators;