import RxStore from '@zazapeta/rx-react-store';

function getHash(hash) {
  return hash.split('#/').pop();
}

const ns = 'Todo';
const initialState = {
  todos: [],
  hash: getHash(document.location.hash),
};

const todoStore = new RxStore({ ns, initialState });

todoStore.load();

function handleHashChange(e) {
  todoStore.dispatch((state) => ({
    ...state,
    hash: getHash(e.newURL),
  }));
}

window.addEventListener('hashchange', handleHashChange, false);
window.addEventListener('beforeunload', () => todoStore.save(), false);

export default todoStore;
