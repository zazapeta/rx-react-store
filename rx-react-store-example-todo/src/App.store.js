import RxStore from '@zazapeta/rx-react-store';

const initialState = {
  title: 'Super App',
  version: 1,
};

const ns = 'App';

let appStore = new RxStore({ ns, initialState });

appStore.BeforeGlobalParallel.set('Perf', (state, action) =>
  console.time(`${action.name}`),
);

appStore.AfterGlobalParallel.set('Perf', (state, action) =>
  console.timeEnd(`${action.name}`),
);

appStore.AfterGlobalParallel.set('InfoLogger', (state, action) =>
  console.info(`[${action.name}] STATE:`, state),
);

export default appStore;
