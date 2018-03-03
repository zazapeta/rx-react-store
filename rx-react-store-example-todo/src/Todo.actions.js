import todoStore from './Todo.store';

// action + state-reducer
const changeTodo = (state, todo, content) => ({
  ...state,
  todos: state.todos.map((t) => (t.id === todo.id ? { ...todo, content } : t)),
});

// action dispatcher
export function handleTodoChange(todo, content) {
  todoStore.dispatch(changeTodo);
}

function createTodo(content = '') {
  return {
    id: Date.now(),
    content,
    isOpen: false,
    isDone: false,
  };
}

const addTodo = (state, content) => ({
  ...state,
  todos: state.todos.concat(createTodo(content)),
});

export function handleTodoAdd(content) {
  let todoContent = content.trim();
  if (todoContent === '') {
    return;
  }
  todoStore.dispatch(addTodo, todoContent);
}

const openTodo = (state, todo) => ({
  ...state,
  todos: state.todos.map(
    (t) => (t.id === todo.id ? { ...todo, isOpen: true } : t),
  ),
});

export function handleTodoOpen(todo) {
  todoStore.dispatch(openTodo, todo);
}

const closeTodo = (state, todo) => ({
  ...state,
  todos: state.todos.map(
    (t) => (t.id === todo.id ? { ...todo, isOpen: false } : t),
  ),
});

export function handleTodoClose(todo) {
  todoStore.dispatch(closeTodo, todo);
}

const deleteTodo = (state, todo) => ({
  ...state,
  todos: state.todos.filter((t) => t.id !== todo.id),
});

export function handleTodoDelete(todo) {
  todoStore.dispatch(deleteTodo, todo);
}

const todoToggle = (state, todo, isDone) => ({
  ...state,
  todos: state.todos.map((t) => (t.id === todo.id ? { ...todo, isDone } : t)),
});

export function handleTodoToggle(todo, isDone) {
  todoStore.dispatch(todoToggle, todo, isDone);
}
