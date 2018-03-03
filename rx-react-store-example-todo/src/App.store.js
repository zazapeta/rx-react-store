import RxStore from '@zazapeta/rx-react-store';

const initialState = {
  title: 'Super App',
  version: 1,
};

const ns = 'App';

let appStore = new RxStore({ ns, initialState });

appStore.AfterGlobalParalel.set('InfoLogger', (state, action) =>
  console.info(`[${action.name}] STATE:`, state),
);

export default appStore;
