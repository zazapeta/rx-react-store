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

  async dispatch(action = (state) => state) {
    await promiseAllMap(BeforeGlobalParalel, this.state);
    await promiseAllMap(this.BeforeLocalParalel, this.state);
    await promiseSeqMap(BeforeGlobalSequential, this.state);
    await promiseSeqMap(this.BeforeLocalSequential, this.state);
    this._subject.next(action(this.state));
    await promiseAllMap(AfterGlobalParalel, this.state);
    await promiseAllMap(this.AfterLocalParalel, this.state);
    await promiseSeqMap(AfterGlobalSequential, this.state);
    await promiseSeqMap(this.AfterLocalSequential, this.state);
  }

  connect(mapStoreToProps) {
    return (BaseComponent) => {
      let thisStore = this;
      let __subscriber;
      class ConnectedComponent extends React.Component {
        constructor(props) {
          super(props);
          this.state = thisStore.state;
          __subscriber = thisStore.subject.subscribe({
            next: (state) => this.setState(state),
          });
        }

        componentWillUnmount() {
          __subscriber.unsubscribe();
        }

        render() {
          return (
            <BaseComponent
              {...this.props}
              {...mapStoreToProps(this.state, this.props)}
            />
          );
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
