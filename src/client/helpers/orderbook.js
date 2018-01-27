import {fromJS} from 'immutable'


module.exports = (state, order) => {

  if(order.bid){
    const bids = state.get('bids').toJS();
    const bidDepth = Object.keys(bids).length;
    // We only want to add orders to orderbook if they fall within the current top 25 prices
    const minPrice = Object.keys(bids).reduce((curr,prev) => {
      if(curr.price < prev) return curr.price;
      return prev;
    },100000000);

    if(bidDepth > 24 && order.price < minPrice) return state;

    bids[order.price] = order;
    if(order.orders === 0) delete bids[order.price];

    return state.set('bids',fromJS(bids));
  }else{
    const asks = state.get('asks').toJS();
    const askDepth = Object.keys(asks).length;
    // We only want to add orders to orderbook if they fall within the current top 25 prices
    const maxPrice = Object.keys(asks).reduce((curr,prev) => {
      if(curr.price > prev) return curr.price;
      return prev;
    },0);

    if(askDepth > 24 && order.price > maxPrice) return state;

    asks[order.price] = order;
    if(order.orders === 0) delete asks[order.price];
    return state.set('asks',fromJS(asks));
  }
  return state;
}