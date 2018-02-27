import React from 'react';
import { getComponentName } from './utils';

describe('getComponentName', () => {
  test('should return name of a functional component', () => {
    let Dumb = () => <div />;
    expect(getComponentName(Dumb)).toBe(Dumb.name);
  });
// TODO : fix the displayName (babel doen't attach displayName when parsing jsx and react class)
// so this test cannot pass.
  test.skip('should return name of a react component', () => {
    class Dumb extends React.Component {
      render() {
        return <div />;
      }
    }
    console.log(Dumb);
    expect(getComponentName(Dumb)).toBe(Dumb.displayName);
  });

  test('should return a string', () => {
    expect(getComponentName('Dumb')).toBe('Component');
  });
});
