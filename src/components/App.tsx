import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from '../routes/Home';
import {Speech} from '../routes/Speech';
import { Login } from '../routes/Login';
function App(): JSX.Element {
  return (
    <Switch>
      <Route path="/speech" component={Speech}></Route>
      <Route path="/login" component={Login}></Route>
      <Route exact path="/" component={Home} ></Route>
    </Switch>
  );
}

export default App;
