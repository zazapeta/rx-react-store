import React from 'react';
import CounterStore from './Counter.store';
import CounterView from './Counter.view';

const ADD = (state) => ({
  ...state,
  counter: state.counter - 1
});

const MINUS = (state) => ({
  ...state,
  counter: state.counter - 1
});

class CounterContainer extends React.Component {
  handleAdd() {
    CounterStore.dispatch(ADD);
  }

  handleMinus(){
    CounterStore.dispatch(MINUS);
  }

  render() {
    return <CounterView counter={this.props.myCounter} onAdd={this.handleAdd} onMinus={this.handleMinus}/>;
  }
}

export default CounterStore.connect((store) => ({
  myCounter: store.counter
}))(CounterContainer);
