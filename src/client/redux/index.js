import {combineReducers} from 'redux'
import configureStore from './createStore'

export default () => {


  const rootReducer = combineReducers({
    default: require('./DefaultReducer').reducer,
  })


  return configureStore(rootReducer)
}