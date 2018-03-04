import React, { Component } from 'react';

import appStore from './App.store';

import Todos from './Todo/Todo.container';

import 'todomvc-app-css/index.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Todos />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return state;
}

export default appStore.connect(mapStateToProps)(App);
