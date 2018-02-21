import RxStore, { addGlobalMiddleware } from './rxStore';

const appStore = new RxStore('app', { version: 1, title: 'test' });

appStore.addMiddlewars((store, action) =>
  console.log('APP STORE : ', action.name, store.state)
);
appStore.addMiddlewars((store, action) => {
  if (action.name.indexOf('async') !== -1) {
    store.dispatch(function YouhouHH(state) {
      console.error('YOUHOU !!!! ');
      return { ...state, ghost: 'place here' };
    });
  }
});

const STATE_HISTORY = [];
let nsLogGroup;
addGlobalMiddleware((store, action) => {
  if (nsLogGroup !== store.namespace){
    console.groupEnd();
    console.group(store.namespace);
    nsLogGroup = store.namespace;
  }
  console.info(STATE_HISTORY);
});

addGlobalMiddleware((store, action) =>
  STATE_HISTORY.push(store.state, action.name)
);

export default appStore;
