import React from 'react';
import CounterStore from './Counter.store';

function ConnectedTest(props){
  return (
    <div>
      {props.counter}
    </div>
  )
}

export default CounterStore.connect((state) => state)(ConnectedTest);
