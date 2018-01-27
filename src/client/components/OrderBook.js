import React from 'react';
import styled from 'styled-components';

import Asks from './Asks.js';
import Bids from './Bids.js';

const Wrapper = styled.div`
  display:flex;
`

const Container = (props) => {
  return (<div>
    <Wrapper>
      <Bids />
      <Asks />
    </Wrapper>
  </div>)
}

export default Container;