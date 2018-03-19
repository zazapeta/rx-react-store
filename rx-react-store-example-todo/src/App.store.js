import RxStore from '@zazapeta/rx-react-store';

const initialState = {
  title: 'Super App',
  version: 1,
};

const ns = 'App';

let appStore = new RxStore({ ns, initialState });

appStore.BeforeGlobalParallel.set('Perf', (state, reducer) =>
  console.time(`${reducer.name}`),
);

appStore.AfterGlobalParallel.set('Perf', (state, reducer) =>
  console.timeEnd(`${reducer.name}`),
);

appStore.AfterGlobalParallel.set('InfoLogger', (state, reducer) =>
  console.info(`[${reducer.name}] STATE:`, state),
);

export default appStore;
