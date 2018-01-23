import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'


const {Types, Creators} = createActions({
  prices: ['data'],
})


export const INITIAL_STATE = Immutable({
  price: null,
  error: null,
  fetching: false
});

export const showPrices = (state , {data}) => {
  const {etheur} = data;
  return state.merge({fetching: false, error: null, price: etheur})
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PRICES]: showPrices,
})

export const PriceTypes = Types;
export default Creators;