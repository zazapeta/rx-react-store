import {
  changeTodo,
  addTodo,
  openTodo,
  closeTodo,
  deleteTodo,
  toggleTodo,
} from './Todo.reducers';
import todoStore from './Todo.store';

// ACTION DISPATCHER
export const handleTodoChange = todoStore.createDispatcher(changeTodo); // equivalent at (todo) =>  todoStore.dispatch(changeTodo, todo);

export function handleTodoAdd(content) {
  let todoContent = content.trim();
  if (todoContent === '') {
    return;
  }
  return todoStore.dispatch(addTodo, todoContent);
}

export const handleTodoOpen = todoStore.createDispatcher(openTodo);

export const handleTodoClose = todoStore.createDispatcher(closeTodo);

export const handleTodoDelete = todoStore.createDispatcher(deleteTodo);

export const handleTodoToggle = todoStore.createDispatcher(toggleTodo);
