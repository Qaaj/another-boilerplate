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
  padding: 10px;
  border-radius: 5px;
  background-color: #455A64;
  cursor: pointer;
  color: white;
  max-width: 100px;
  text-align: center;
  margin: 20px;
`;

const Container = (props) => {
  return (<div>
    <Button onClick={()=>props.click()}>{props.connected ? 'Disconnect' : 'Connect'}</Button>
    <Wrapper>
      <OrderBook />
      <Trades />
    </Wrapper>
  </div>)
}

const mapStateToProps = (state) => {
  return {
    connected: state.default.get('connected'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    click: (data) => dispatch(SettingActions.connection()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
