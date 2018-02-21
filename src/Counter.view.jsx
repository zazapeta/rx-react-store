import React from 'react';

export default (props) => (
  <div>
    <button onClick={props.onAdd}> + </button>
    <div style={{ color: 'red' }}>{props.counter}</div>;
    <button onClick={props.onMinus}> - </button>
  </div>
);
