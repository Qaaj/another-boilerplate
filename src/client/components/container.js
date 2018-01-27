import React from 'react';
import styled from 'styled-components';

import Trades from './Trades.js';
import OrderBook from './OrderBook.js';

const Wrapper = styled.div`
  display:flex;
`

const Container = (props) => {
  return (<div>
    <Wrapper>
      <OrderBook />
      <Trades />
    </Wrapper>
  </div>)
}

export default Container;