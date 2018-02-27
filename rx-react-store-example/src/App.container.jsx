import React, { Component } from 'react';

import appStore from './App.store';

// reducer
const update = (field, value) => (state) => ({ ...state, [field]: value });

// action dispatcher
function handleInputTitle(e) {
  appStore.dispatch(update('title', e.target.value));
}

function handleInputVersion(e) {
  appStore.dispatch(update('version', e.target.value));
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            {this.props.title} - {this.props.version}
          </h1>
        </header>
        <input type="text" onChange={handleInputTitle} />
        <input type="text" onChange={handleInputVersion} />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return state;
}

export default appStore.connect(mapStateToProps)(App);
