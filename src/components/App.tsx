
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
import { BibleStudy } from '../routes/BibleStudy';
import { CreatingBibleStudy } from '../routes/CreatingBibleStudy';
import { QT } from '../routes/QT';
import { ChildSchool } from '../routes/ChildSchool';
import { BulletenBoard } from '../routes/BulletenBoard';
import { CreatingQT } from '../routes/CreatingQT';
import { CreatingChildSchool } from '../routes/CreatingChildSchool';
import { CreatingBulletenBoard } from '../routes/CreatingBulletenBoard';
import {Posting} from './Posting';
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
      <Route strict path="/worship/:Id" component={WorshipDetail}></Route>
      <Route path="/worship" component={WorshipList}></Route>
      <Route path="/signup" component={Singup}></Route>
      <Route path="/login" component={Login}></Route> 
      <Route path="/about" component={About}></Route>
      <Route path="/contact" component={Contact}></Route>
      <Route path="/connect/biblestudy/create" component={CreatingBibleStudy}></Route>
      <Route strict path="/connect/biblestudy/:Id" component={Posting}></Route>
      <Route path="/connect/biblestudy" component={BibleStudy}></Route>
      <Route path="/connect/qt/create" component={CreatingQT}></Route>
      <Route strict path="/connect/qt/:Id" component={Posting}></Route>
      <Route path="/connect/qt" component={QT}></Route>
      <Route path="/connect/childschool/create" component={CreatingChildSchool}></Route>
      <Route strict path="/connect/childschool/:Id" component={Posting}></Route>
      <Route path="/connect/childschool" component={ChildSchool}></Route>
      <Route path="/connect/bulletenboard/create" component={CreatingBulletenBoard}></Route>
      <Route strict path="/connect/bulletenboard/:Id" component={Posting}></Route>
      <Route path="/connect/bulletenboard" component={BulletenBoard}></Route>
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
