import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from '../routes/Home';
import {ServiceList} from '../routes/ServiceList';
import { Login } from '../routes/Login';
import { Singup } from '../routes/Signup';
import { ServiceDetail } from '../routes/ServiceDetail';
import { WritingService } from '../routes/WritingService';
import {GlobalStyles} from './GlobalStyles';
import { Header } from './Header';
import { Footer } from './Footer';
function App(): JSX.Element {
  return (
    <>
    <Header/>
    <Switch>
      <Route exact path ="/service/create" component={WritingService}></Route>
      <Route strict path="/service/:speechId" component={ServiceDetail}></Route>
      <Route path="/service" component={ServiceList}></Route>
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
