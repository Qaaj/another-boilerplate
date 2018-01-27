import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import SettingActions from '../redux/DefaultReducer';
import Trades from './Trades.js';
import OrderBook from './OrderBook.js';

const Wrapper = styled.div`
  display:flex;
`;

const Button = styled.div`
  display: inline-block;
  padding: 10px;
  border-radius: 5px;
  background-color: #455A64;
  color: white;
  max-width: 300px; text-align: center;
  margin: 20px 5px;
`;

const Container = (props) => {
  const price = props.trades.toJS()[0] ? props.trades.toJS()[0].price : "Loading...";
  return (<div>
    <div>
      <Button style={{cursor: 'pointer'}}
              onClick={() => props.click()}>{props.connected ? 'Disconnect' : 'Connect'}</Button>
      <Button>Latest price: {price}</Button>
    </div>
    <Wrapper>
      <OrderBook/>
      <Trades/>
    </Wrapper>
  </div>)
}

const mapStateToProps = (state) => {
  return {
    connected: state.default.get('connected'),
    trades: state.default.get('trades'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    click: (data) => dispatch(SettingActions.connection()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
