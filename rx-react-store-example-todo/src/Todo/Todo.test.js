import * as ts from '../testSetup'; // hack to localStorage && create-react-app
import {
  createTodo,
  addTodo,
  changeTodo,
  closeTodo,
  deleteTodo,
  openTodo,
  toggleTodo,
} from './Todo.reducers';
import { handleTodoAdd } from './Todo.actions';
import todoStore from './Todo.store';

const expectState = (state) => (action) => (...args) => (expectedState) =>
  expect(action(state, ...args)).toEqual(
    expect.objectContaining(expectedState),
  );

describe('Reducers', () => {
  test('createTodo', () => {
    expect(createTodo('task 1')).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        content: 'task 1',
        isOpen: false,
        isDone: false,
      }),
    );
  });

  test('addTodo', () =>
    expectState({ todos: [] })(addTodo)('task 1')({
      todos: [
        {
          id: expect.any(Number),
          content: 'task 1',
          isOpen: false,
          isDone: false,
        },
      ],
    }));

  test('changeTodo', () => {
    let todo = createTodo('task 1');
    expectState({ todos: [todo] })(changeTodo)(todo, 'edited task 1')({
      todos: [
        {
          id: todo.id,
          content: 'edited task 1',
          isOpen: false,
          isDone: false,
        },
      ],
    });
  });

  test('closeTodo', () => {
    let todo = createTodo('task 1');
    todo.isOpen = true;
    expectState({ todos: [todo] })(closeTodo)(todo)({
      todos: [
        {
          ...todo,
          isOpen: false,
        },
      ],
    });
  });

  test('openTodo', () => {
    let todo = createTodo('task 1');
    todo.isOpen = false;
    expectState({ todos: [todo] })(openTodo)(todo)({
      todos: [
        {
          ...todo,
          isOpen: true,
        },
      ],
    });
  });

  test('deleteTodo', () => {
    let todo = createTodo('task 1');
    expectState({ todos: [todo] })(deleteTodo)(todo)({
      todos: [],
    });
  });

  test('toggleTodo to isDone true', () => {
    let todo = createTodo('task 1');
    todo.isDone = false;
    expectState({ todos: [todo] })(toggleTodo)(todo, true)({
      todos: [
        {
          ...todo,
          isDone: true,
        },
      ],
    });
  });

  test('toggleTodo to isDone true', () => {
    let todo = createTodo('task 1');
    todo.isDone = true;
    expectState({ todos: [todo] })(toggleTodo)(todo, false)({
      todos: [
        {
          ...todo,
          isDone: false,
        },
      ],
    });
  });
});

describe('Action dispatcher', () => {
  // we have to test only handleTodoAdd as others are just dispatcher
  test('handleTodoAdd - should trimm the content and not dispatch if content is empty', async () => {
    let oldDispatch = todoStore.dispatch;
    todoStore.dispatch = jest.fn();

    await handleTodoAdd('task 1   '); // dispatching is always async
    expect(todoStore.dispatch.mock.calls[0]).toEqual([
      addTodo,
      'task 1   '.trim(),
    ]);

    await handleTodoAdd('');
    expect(todoStore.dispatch.mock.calls[1]).toEqual(undefined);
    todoStore.dispatch = oldDispatch;
  });
});
