import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';


const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  font-size: 16px;
  color: #E3F2FD;
`;


const Column = styled.div`
  min-width: 100px;
`

const Container = (props) => {
  const asks = props.asks.toJS();
  let total = 0;
  let items = Object.keys(asks).map((key, i) => {
    const item = asks[key];
    total += item.amount;
    return <Row key={`itemask-${i}`}>
      <Column>{item.price}</Column>
      <Column>{total.toString().substr(0,5)}</Column>
      <Column>{item.amount.toString().substr(0,5)}</Column>
      <Column>{item.orders}</Column>
    </Row>
  }).splice(0,25)

  return (<div>
    {items}
  </div>)
}

const mapStateToProps = (state) => {
  return {
    asks: state.default.get('asks'),
  }
}

export default connect(mapStateToProps)(Container);
