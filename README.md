# RX-REACT-STORE

A tiny implementation of connected to gloabl/scoped store based on the awesome [RxJs](http://reactivex.io/rxjs/)'s implementation of the observer/observable pattern.

The purpose of this project is to familiarise myself to publish my first open source lib for npm based on github repo :)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

The full-documented is on this site [gitbooks/rx-react-store](https://zazapeta.gitbooks.io/rx-react-store/content/)

## Installing

```
npm i @zazapeta/rx-react-store
```

## TODO Using

And in App.store.js

```
import RxStore from '@zazapeta/rx-react-store';

// For debugging purpose
const ns = 'App';

// InitialState
const initialState = {
  version : 1,
  title : 'Dashboard'
};

const appStore = new RxStore({ ns, initialState });

export default appStore;
```

And in App.container.jsx

```
import React, { Component } from 'react';

import appStore from './App.store';

// reducer
const updateTitle = (title) => (state) => ({ ...state, title });

// action dispatcher
function handleInput(e){
  appStore.dispatch(updateTitle(e.target.value));
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            {this.props.title} - {this.props.version}
          </h1>
        </header>
        <input
          type="text"
          onChange={handleInput}
        />
      </div>
    );
  }
}

function mapStateToProps(state, props){
  return state;
}

export default appStore.connect(mapStateToProps)(App);
```

## Contributing

### Code of conduct

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

### Workflow

Hard use of (Git Flow)[https://danielkummer.github.io/git-flow-cheatsheet/].

### Prerequisites

• npm
• git

```
git clone git@github.com:zazapeta/rx-react-store.git
cd rx-react-store
npm i
npm run test:watch
```

### Prettier & pre-commit

Prettier is configured as a pre-commit hook with using of [pretty-quick](https://github.com/azz/pretty-quick) and [husky](https://github.com/typicode/husky) as described [here](https://prettier.io/docs/en/precommit.html#option-2-pretty-quick-https-githubcom-azz-pretty-quick).

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Sami Ghazouane** - _Initial work_ - [zazapeta](https://github.com/zazapeta)

See also the list of [contributors](https://github.com/zazapeta/rx-react-store/contributors) who participated in this project.

## License

This project is licensed under the MIT License.

## Acknowledgments

* Thx to RxJs, React and Redux who inspired me.
