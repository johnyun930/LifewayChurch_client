
import React, { useState,useContext } from 'react';
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
import {LoginContext, UserInfoContext} from '../states/LoginContext';
import { Connect } from '../routes/Connect';
import {ThemeProvider} from 'styled-components';
import { theme } from '../styles/theme';
import {UserInfo} from '../states/LoginContext';
import { Contact } from '../routes/Contact';
import {About} from '../routes/About';
function App(): JSX.Element {
  const [login,setLogin] = useState<boolean>(false);
  const [user,setUser] = useState<UserInfo>(useContext(UserInfoContext));
  console.log(process.env.REACT_APP_API_KEY)
  return (
    <>
    <ThemeProvider theme={theme}>
    <LoginContext.Provider value={{login,setLogin}}>
    <UserInfoContext.Provider value={{...user,setUser}}>
    <Header/>
    <Switch>
       <Route path ="/worship/create" component={user.isAdmin?CreatingWorship:Home}></Route> 
      <Route strict path="/worship/:speechId" component={WorshipDetail}></Route>
      <Route path="/worship" component={WorshipList}></Route>
      <Route path="/signup" component={Singup}></Route>
      <Route path="/login" component={Login}></Route> 
      <Route path="/about" component={About}></Route>
      <Route path="/contact" component={Contact}></Route>
       <Route path="/connect" component={Connect}></Route>
      <Route exact path="/" component={Home}></Route>
    </Switch>
    <Footer/>
    <GlobalStyles/>
    </UserInfoContext.Provider>
    </LoginContext.Provider>
    </ThemeProvider>
</>
  );
}

export default App;
