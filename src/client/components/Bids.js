import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';


const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  font-size: 16px;
  color: #E3F2FD;
  text-align: right;
`;


const Column = styled.div`
  min-width: 100px;
`;

const FirstColumn = styled.div`
  font-weight: bold;
  min-width: 100px;
`;

const Container = (props) => {
  const bids = props.bids.toJS();
  let total = 0;
  let items = Object.keys(bids).map((key, i) => {
    const item = bids[key];
    total += item.amount;

    return <Row change={item.change} key={`itembid-${i}`}>
      <Column>{item.orders}</Column>
      <Column>{item.amount.toString().substr(0,5)}</Column>
      <Column>{total.toString().substr(0,5)}</Column>
      <Column>{item.price}</Column>
    </Row>
  }).splice(0,24)

  return (<div>
    <Row>
      <FirstColumn>Orders</FirstColumn>
      <FirstColumn>Amount</FirstColumn>
      <FirstColumn>Total</FirstColumn>
      <FirstColumn>Price</FirstColumn>
    </Row>
      {items}
  </div>)
}

const mapStateToProps = (state) => {
  return {
    bids: state.default.get('bids'),
  }
}

export default connect(mapStateToProps)(Container);
