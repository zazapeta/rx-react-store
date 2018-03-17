import React from 'react';
import { Subject } from 'rxjs';
import { getComponentName, promiseAllMap, promiseSeqMap } from './utils';

let hooks = [
  'BeforeGlobalParalel', // Promise.all
  'BeforeLocalParalel', // Promise.all
  'BeforeGlobalSequential', // for in
  'BeforeLocalSequential', // for in
  'AfterGlobalParalel',
  'AfterLocalParalel',
  'AfterGlobalSequential',
  'AfterLocalSequential',
];

let BeforeGlobalParalel = new Map();
let BeforeGlobalSequential = new Map();
let AfterGlobalParalel = new Map();
let AfterGlobalSequential = new Map();
let HOOKS = {
  BeforeGlobalParalel,
  BeforeGlobalSequential,
  AfterGlobalParalel,
  AfterGlobalSequential,
};

function noop(state) {
  return state;
}

class RxStore {
  constructor({ ns = 'rxStore', initialState = {} } = {}) {
    this._state = initialState;
    this._ns = ns;
    this._subject = new Subject();
    this._subject.subscribe((state) => (this._state = state));
    hooks.forEach(
      (h) => (this[h] = HOOKS.hasOwnProperty(h) ? HOOKS[h] : new Map()),
    );
  }

  get namespace() {
    return this._ns;
  }

  get state() {
    return this._state;
  }

  save() {
    localStorage.setItem(this._ns, JSON.stringify(this._state));
    return this;
  }

  load() {
    let ls = localStorage.getItem(this._ns);
    this._state = (ls && JSON.parse(ls)) || this._state;
    return this;
  }

  get subject() {
    return this._subject;
  }

  async dispatch(action = (state) => state, ...rest) {
    let commonArgs = [this.state, action, ...rest];
    await promiseAllMap(BeforeGlobalParalel, ...commonArgs);
    await promiseAllMap(this.BeforeLocalParalel, ...commonArgs);
    await promiseSeqMap(BeforeGlobalSequential, ...commonArgs);
    await promiseSeqMap(this.BeforeLocalSequential, ...commonArgs);
    this._subject.next(action(this.state, ...rest));
    await promiseAllMap(AfterGlobalParalel, ...commonArgs);
    await promiseAllMap(this.AfterLocalParalel, ...commonArgs);
    await promiseSeqMap(AfterGlobalSequential, ...commonArgs);
    await promiseSeqMap(this.AfterLocalSequential, ...commonArgs);
  }

  // TODO: test it
  createDispatcher(action) {
    return (...args) => this.dispatch(action, ...args);
  }

  // TODO: test it and use it
  createDispatchers(actions = {}) {
    let dispatchers = {};
    Object.keys(actions).forEach(
      (action) => (dispatchers[action] = this.createDispatcher(action)),
    );
    return dispatchers;
  }

  connect(mapStateToProps = noop) {
    return (BaseComponent) => {
      let thisStore = this;
      let __subscriber;
      class ConnectedComponent extends React.Component {
        constructor(props) {
          super(props);
          this.state = mapStateToProps(thisStore.state, props);
        }

        componentDidMount() {
          __subscriber = thisStore.subject.subscribe({
            next: (nextState) =>
              this.setState(mapStateToProps(nextState, this.props)),
          });
        }

        componentWillUnmount() {
          __subscriber.unsubscribe();
        }

        render() {
          return <BaseComponent {...this.props} {...this.state} />;
        }
      }

      ConnectedComponent.displayName = `[${
        thisStore.namespace
      }]rxConnected(${getComponentName(BaseComponent)})`;
      return ConnectedComponent;
    };
  }
}

export default RxStore;
