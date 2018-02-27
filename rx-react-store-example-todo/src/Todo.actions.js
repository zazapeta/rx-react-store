import todoStore from './Todo.store';

export function handleTodoChange(todo, content) {
  todo.content = content;
  todoStore.dispatch((state) => ({ ...state }));
}

export function handleTodoAdd(content) {
  let todoContent = content.trim();
  if (todoContent === '') {
    return;
  }
  todoStore.dispatch((state) => ({
    ...state,
    todos: state.todos.concat(createTodo(todoContent)),
  }));
}

export function handleTodoOpen(todo) {
  todo.isOpen = true;
  todoStore.dispatch((state) => ({ ...state }));
}

export function handleTodoClose(todo) {
  todo.isOpen = false;
  todoStore.dispatch((state) => ({ ...state }));
}

export function handleTodoDelete(todo) {
  todoStore.dispatch((state) => {
    return {
      ...state,
      todos: state.todos.filter((t) => t.id !== todo.id),
    };
  });
}

export function handleTodoToggle(todo, isDone) {
  todo.isDone = isDone;
  todoStore.dispatch((state) => ({ ...state }));
}

function createTodo(content = '') {
  return {
    id: Date.now(),
    content,
    isOpen: false,
    isDone: false,
  };
}
