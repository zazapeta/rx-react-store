import React from 'react';
import { Subject } from 'rxjs';

let MIDDLEWARES = []; 

export function addGlobalMiddleware(mw){
  return MIDDLEWARES.push(mw);
}

class RxStore {
  constructor(ns = 'rxStore', initialState = {}) {
    this._state = initialState;
    this._ns = ns;
    this._subject = new Subject();
    this._subject.subscribe((state) => this._state = state);
    this._middlewares = [];
  }

  static addGlobalMiddleware(mw){
    return addGlobalMiddleware(mw);
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

  get state() {
    return this._state;
  }

  get subject() {
    return this._subject;
  }

  get middlewares(){
    return this._middlewares;
  }

  get namespace(){
    return this._ns;
  }

  addMiddlewars(mw){
    this._middlewares.push(mw);
  }

  dispatch(action) {
    MIDDLEWARES.forEach((mw) => mw(this, action));
    this._middlewares.forEach((mw) => mw(this, action));
    this._subject.next(action(this.state));
  }

  connect = (mapStoreToProps) => (BaseComponent) => {
    let _this = this;
    let __subscriber;
    class ConnectedComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = _this.state;
        __subscriber = _this.subject.subscribe({
          next: (state) => this.setState(state)
        });
      }

      componentWillUnmount() {
        __subscriber.unsubscribe();
      }

      render() {
        return <BaseComponent {...this.props} {...mapStoreToProps(this.state, this.props)}/>
      }
    }
    ConnectedComponent.displayName =
      '[' + _this._ns + ']rxConnected(' + BaseComponent.displayName ||
      BaseComponent.name + ')';
    return ConnectedComponent;
  };
}

export default RxStore;
