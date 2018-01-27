import {createReducer, createActions} from 'reduxsauce'
import {fromJS} from 'immutable'
import socket from '../services/socket';

import updateOrderbook from '../helpers/orderbook';

const {Types, Creators} = createActions({
  ticker: ['data'],
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

export const showPrices = (state , {data}) => {
  // console.log('PRICE',data);
  return state;
}

export const handleConnection = (state) => {
  console.log(socket);
  if(socket.connected){
    socket.disconnect();
    return state.set('connected',false);
  }else{
    socket.connect();
    return state.set('connected',true);
  }
  return state;
}
export const showTrades = (state , {data}) => {

  var dt = new Date(0);
  dt.setUTCSeconds(data[1][1]/1000);
  const timestamp = `${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`;
  const price = data[1][3];
  const change = data[1][2]
  let trades = state.get('trades').toJS();

  trades.unshift({
    timestamp,
    price,
    change
  });

  if(trades.length > 25) trades.pop();

  return state.set('trades',fromJS(trades));
}

export const showBook = (state , {data}) => {

  const price = data[0][0];
  const orders = data[0][1];
  const amount = data[0][2];
  const bid = amount > 0;

  const order = { price, amount: Math.abs(amount), orders, bid};

  return updateOrderbook(state, order);

}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TICKER]: showPrices,
  [Types.TRADES]: showTrades,
  [Types.BOOK]: showBook,
  [Types.CONNECTION]: handleConnection,
})

export const PriceTypes = Types;
export default Creators;