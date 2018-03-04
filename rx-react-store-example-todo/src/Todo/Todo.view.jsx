import React from 'react';

function Todo({
  isOpen,
  isDone,
  content,
  onDelete,
  onChange,
  onOpen,
  onClose,
  onToggle,
}) {
  return (
    <li
      className={`${isDone && 'completed'} ${isOpen && 'editing'}`}
      onDoubleClick={onOpen}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={(e) => onToggle(e.target.checked)}
          checked={isDone}
        />
        <label>{content}</label>
        <button className="destroy" onClick={onDelete} />
      </div>
      <input
        className="edit"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onClose()}
      />
    </li>
  );
}

export default function TodoView({
  todos,
  onTodoChange,
  onTodoClose,
  onTodoDelete,
  onTodoOpen,
  onTodoToggle,
}) {
  return (
    <ul className="todo-list">
      {todos.map((todo, i) => (
        <Todo
          key={i}
          onChange={(content) => onTodoChange(todo, content)}
          onClose={() => onTodoClose(todo)}
          onOpen={() => onTodoOpen(todo)}
          onDelete={() => onTodoDelete(todo)}
          onToggle={(isDone) => onTodoToggle(todo, isDone)}
          content={todo.content}
          isOpen={todo.isOpen}
          isDone={todo.isDone}
        />
      ))}
    </ul>
  );
}
