import React from 'react';

import todoStore from './Todo.store';
import {
  handleTodoAdd,
  handleTodoChange,
  handleTodoClose,
  handleTodoDelete,
  handleTodoOpen,
  handleTodoToggle,
} from './Todo.dispatchers';
import TodoView from './Todo.view';

function TodoContainer({ todos, hash }) {
  return (
    <section className="todoapp">
      <div>
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onKeyPress={(e) =>
              e.key === 'Enter' &&
              (handleTodoAdd(e.target.value), (e.target.value = ''))
            }
          />
        </header>
      </div>
      <TodoView
        todos={todos}
        onTodoClose={handleTodoClose}
        onTodoDelete={handleTodoDelete}
        onTodoOpen={handleTodoOpen}
        onTodoChange={handleTodoChange}
        onTodoToggle={handleTodoToggle}
      />
      <footer className="footer">
        <span className="todo-count">
          <strong>{todos.length}</strong>
          <span> </span>
          <span>{todos.length > 1 ? 'items' : 'item'}</span>
          <span> left</span>
        </span>
        <ul className="filters">
          <li>
            <a href="#/" className={`${hash === '' && 'selected'}`}>
              All
            </a>
          </li>
          <span> </span>
          <li>
            <a href="#/active" className={`${hash === 'active' && 'selected'}`}>
              Active
            </a>
          </li>
          <span> </span>
          <li>
            <a
              href="#/completed"
              className={`${hash === 'completed' && 'selected'}`}>
              Completed
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

function mapStateToProps({ todos, hash }, props) {
  // Work very well with reselect.
  let _todos = todos.sort((t1, t2) => t1.id < t2.id);

  if (hash === 'active') {
    _todos = _todos.filter((todo) => !todo.isDone);
  } else if (hash === 'completed') {
    _todos = _todos.filter((todo) => todo.isDone);
  }

  return { todos: _todos, hash };
}

export default todoStore.connect(mapStateToProps)(TodoContainer);
