import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from '../routes/Home';
import {WorshipList} from '../routes/WorshipList';
import { Login } from '../routes/Login';
import { Singup } from '../routes/Signup';
import { WorshipDetail } from '../routes/WorshipDetail';
import { CreatingWorship } from '../routes/CreatingWorship';
import {GlobalStyles} from './GlobalStyles';
import { Header } from './Header';
import { Footer } from './Footer';
function App(): JSX.Element {
  return (
    <>
    <Header/>
    <Switch>
      <Route path ="/worship/create" component={CreatingWorship}></Route>
      <Route strict path="/worship/:speechId" component={WorshipDetail}></Route>
      <Route path="/worship" component={WorshipList}></Route>
      <Route path="/signup" component={Singup}></Route>
      <Route path="/login" component={Login}></Route>
      <Route exact path="/" component={Home} ></Route>
    </Switch>
    <Footer/>
    <GlobalStyles/>
</>
  );
}

export default App;
