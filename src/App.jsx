import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './Counter.container';
import Connected from './Connected.container';
import AppStore from './App.store';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            {this.props.title} - {this.props.version}
          </h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input
          type="text"
          onChange={(e) =>
            AppStore.dispatch(function asyncChangeTitle(state) {
              return { ...state, title: e.target.value };
            })
          }
        />
        <Counter />
        <Connected />
      </div>
    );
  }
}

export default AppStore.connect((state) => state)(App);
