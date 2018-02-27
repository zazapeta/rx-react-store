import RxStore from './RxStore';
import React from 'react';
import { getComponentName } from './utils';

describe('RxStore', () => {
  test('should initialize a new store', () => {
    let store = new RxStore();
    expect(store instanceof RxStore).toBe(true);
  });

  test('should initialize with correct namespace', () => {
    let ns = 'Users';
    let store = new RxStore(ns);
    expect(store.namespace).toBe(ns);
  });

  test('should intialize with initialState', () => {
    let initialState = {
      users: [{ name: 'jhon' }]
    };
    let store = new RxStore('Users', initialState);
    expect(store.state).toBe(initialState);
  });

  test('should connect a functional component and get rxConnected(...) name', () => {
    let ns = 'Users';
    let store = new RxStore(ns);

    let Dumb = () => <div />;
    let connectedDumb = store.connect((state) => state)(Dumb);
    expect(connectedDumb.displayName).toBe(
      `[${ns}]rxConnected(${getComponentName(Dumb)})`
    );
  });

  test('should connect a component and get rxConnected(...) name', () => {
    let ns = 'Users';
    let store = new RxStore(ns);

    class Dumb extends React.Component {
      render() {
        return <h1>Hello, {this.props.name}</h1>;
      }
    }

    let connectedDumb = store.connect((state) => state)(Dumb);
    expect(connectedDumb.displayName).toBe(
      `[${ns}]rxConnected(${getComponentName(Dumb)})`
    );
  });
});
