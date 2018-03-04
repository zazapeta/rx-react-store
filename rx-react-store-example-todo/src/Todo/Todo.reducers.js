export function createTodo(content = '') {
  return {
    id: Date.now(),
    content,
    isOpen: false,
    isDone: false,
  };
}

/**
 * Change Todo 'content' of a given todo
 * @param {Object} state
 * @param {Todo} todo
 * @param {String} content
 */
export function changeTodo(state, todo, content) {
  return {
    ...state,
    todos: state.todos.map(
      (t) => (t.id === todo.id ? { ...todo, content } : t),
    ),
  };
}

/**
 * Add a new Todo into the state.todos
 * @param {Object} state
 * @param {String} content
 */
export function addTodo(state, content) {
  return {
    ...state,
    todos: state.todos.concat(createTodo(content)),
  };
}

/**
 * Marks given todo as open for edition (isOpen = true)
 * @param {Object} state
 * @param {Todo} todo
 */
export function openTodo(state, todo) {
  return {
    ...state,
    todos: state.todos.map(
      (t) => (t.id === todo.id ? { ...todo, isOpen: true } : t),
    ),
  };
}

/**
 * Marks given todo as close for edition (isOpen = false)
 * @param {Object} state
 * @param {Todo} todo
 */
export function closeTodo(state, todo) {
  return {
    ...state,
    todos: state.todos.map(
      (t) => (t.id === todo.id ? { ...todo, isOpen: false } : t),
    ),
  };
}

/**
 * Delete given todo of the list of todo
 * @param {Object} state
 * @param {Todo} todo
 */
export function deleteTodo(state, todo) {
  return {
    ...state,
    todos: state.todos.filter((t) => t.id !== todo.id),
  };
}

/**
 * Toggle done state of a given todo
 * @param {Object} state
 * @param {Todo} todo
 * @param {Boolean} isDone
 */
export function toggleTodo(state, todo, isDone) {
  return {
    ...state,
    todos: state.todos.map((t) => (t.id === todo.id ? { ...todo, isDone } : t)),
  };
}
