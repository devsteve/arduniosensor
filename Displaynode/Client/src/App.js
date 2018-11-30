import React, { Component } from 'react';
import { Route } from 'react-router';
import { Main } from './components/Main';
import { Historic } from './components/Historic';



class App extends Component {

  displayName = App.name

  render() {
    return (
      <Main></Main>
    );
  }
}

export default App;
