import {
  changeTodo,
  addTodo,
  openTodo,
  closeTodo,
  deleteTodo,
  toggleTodo,
} from './Todo.reducers';
import todoStore from './Todo.store';

// REDUCER DISPATCHER
export const handleTodoChange = todoStore.createDispatcher(changeTodo); // equivalent at (todo) =>  todoStore.dispatch(changeTodo, todo);

export function handleTodoAdd(content) {
  let todoContent = content.trim();
  if (todoContent === '') {
    return;
  }
  return todoStore.dispatch(addTodo, todoContent);
}

let dispatchers = todoStore.createDispatchers({
  openTodo,
  closeTodo,
  deleteTodo,
  toggleTodo,
});

export const handleTodoOpen = dispatchers.openTodo;

export const handleTodoClose = dispatchers.closeTodo;

export const handleTodoDelete = dispatchers.deleteTodo;

export const handleTodoToggle = dispatchers.toggleTodo;
