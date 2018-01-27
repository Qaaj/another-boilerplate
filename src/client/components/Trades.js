import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

const normalize = (val) => {
  let value = 0.2 + (Math.abs(val) / 5);
  value = -0.2 + Math.round(value * 100) / 100;
  if(value > 1) value = 0.8;
  if(value < 0.2) value = 0.2;
  return value;
};

const getBackground = (props) => {
  return props.change > 0 ? `rgba(139, 195, 74, ${normalize(props.change)})` : `rgba(244, 67, 54, ${normalize(props.change)})`;
}

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  background: ${props => getBackground(props)};
  font-size: 16px;
  color: #E3F2FD;
`;


const RowTwo = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

const UpDown = styled.div`
  width: 75px;
  padding-left: 10px;
  color: ${props => props.change > 0 ? '#8BC34A' : '#FF5722'};
`

const Column = styled.div`
  min-width: 100px;
`

const Container = (props) => {
  const trades = props.trades.toJS();

  let items = trades.map((item, i) => {
    return <Row change={item.change} key={`item-${i}`}>
      <UpDown change={item.change} ><i className={`fa fa-chevron-${item.change > 0 ? 'up':'down'}`} aria-hidden="true"/></UpDown>
      <RowTwo>
        <Column>{item.timestamp}</Column>
        <Column>{item.price}</Column>
        <Column>{Math.abs(item.change)}</Column>
      </RowTwo>
    </Row>
  })

  return (<div>
      {items}
  </div>)
}

const mapStateToProps = (state) => {
  return {
    trades: state.default.get('trades'),
  }
}

export default connect(mapStateToProps)(Container);
