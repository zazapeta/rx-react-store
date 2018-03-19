import React from 'react';
import { Subject } from 'rxjs';
import { getComponentName, promiseAllMap, promiseSeqMap } from './utils';

let hooks = [
  'BeforeGlobalParallel', // Promise.all
  'BeforeLocalParallel', // Promise.all
  'BeforeGlobalSequential', // for in
  'BeforeLocalSequential', // for in
  'AfterGlobalParallel',
  'AfterLocalParallel',
  'AfterGlobalSequential',
  'AfterLocalSequential',
];

let BeforeGlobalParallel = new Map();
let BeforeGlobalSequential = new Map();
let AfterGlobalParallel = new Map();
let AfterGlobalSequential = new Map();
let HOOKS = {
  BeforeGlobalParallel,
  BeforeGlobalSequential,
  AfterGlobalParallel,
  AfterGlobalSequential,
};

function noop(state) {
  return state;
}

class RxStore {
  /**
   * Create an RxStore instance
   * @param {Object} opts
   * @param {String} opts.ns The namespace of the store. Debuggin purpose. Default: 'rxStore'
   * @param {Object} opts.initialState Initial state of the store. Default: {}
   *
   * @returns {RxStore} A new RxStore instance
   */
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

  /**
   * Async Method
   * Dispatch an reducer thought the store. This the unique manner to modify the store.
   * @param {Function} reducer The reducer to be dispatched, that will modify the store.
   * Reducer got the state of the store as first arguments and 'rest' next.
   * @param {*} rest Rest of arguments passed to middlewares and to the reducer.
   */
  async dispatch(reducer = (state) => state, ...rest) {
    let commonArgs = [this.state, reducer, ...rest];
    await promiseAllMap(BeforeGlobalParallel, ...commonArgs);
    await promiseAllMap(this.BeforeLocalParallel, ...commonArgs);
    await promiseSeqMap(BeforeGlobalSequential, ...commonArgs);
    await promiseSeqMap(this.BeforeLocalSequential, ...commonArgs);
    this._subject.next(reducer(this.state, ...rest));
    await promiseAllMap(AfterGlobalParallel, ...commonArgs);
    await promiseAllMap(this.AfterLocalParallel, ...commonArgs);
    await promiseSeqMap(AfterGlobalSequential, ...commonArgs);
    await promiseSeqMap(this.AfterLocalSequential, ...commonArgs);
  }

  createDispatcher(reducer) {
    return (...args) => this.dispatch(reducer, ...args);
  }

  createDispatchers(reducers = {}) {
    let dispatchers = {};
    Object.keys(reducers).forEach(
      (reducer) =>
        (dispatchers[reducer] = this.createDispatcher(reducers[reducer])),
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
