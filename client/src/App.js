import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Switch, useHistory } from 'react-router-dom';
import Home from './components/Home';
import Content from './components/Content';
import Login from './components/Login';
import Register from './components/Register';
import RegisterForm from './components/RegisterForm';
import loginbackground from '../src/static/images/loginBackground.jpeg';
import mainbackground from '../src/static/images/mainBackground.jpeg';
import { createGlobalStyle, css } from 'styled-components';
import Navigator from './components/Navigator';
import Cookies from 'universal-cookie';
import { loginCheck } from './_actions/userAction';
import PrivateRoute from './components/route_control/PrivateRoute';
import PublicRoute from './components/route_control/PublicRoute';
import Account from './components/Account';
import UpdateUserPassword from './components/UpdateUserPassword';

const GlobalStyle = createGlobalStyle`
html {
  font-size: 14px;
}
* {
  margin: 0;
  padding: 0;
}
body {
  ${({ location }) => 
    ( 
      location === '/' &&
        css `
        background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.3) ,rgba(0,0,0,0.9)),url(${mainbackground}) no-repeat left 67% / cover;
        height: 100vh;
        `
      ||
      location === '/login' &&
        css `
        background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${loginbackground}) no-repeat left top / 139rem;
        `
      ||
      location === '/regform' &&
        css `
        background: #f3f3f3;
        `
      ||
      location === '/account' || location === '/password' &&
        css `
        background: #f3f3f3;
        `
      ||
        css`
        background: black;
        `
    )
  }
`;

  function App() {
  const location = useLocation();
  const history = useHistory();
  const cookies = new Cookies();
  const dispatch = useDispatch();
  let user = useSelector(state => state.user);

  // login check
  useEffect(() => {
      dispatch(loginCheck({ token: cookies.get('token') }));
  }, []);
  
  return (
    <>
      <GlobalStyle location={ location.pathname } />
      <Navigator user={ user } location={ location.pathname } />
      <Switch>
        // PrivateRoute: ????????? ?????? ??????
        // PublicRoute: ?????? ????????? ?????? ??????
        // restricted :: true: ????????? ?????? ???????????? ?????? ?????? / false: ????????? ???????????? ?????? ?????????
        <PublicRoute restricted={true} path="/" component={ Home } user={ user } exact />
        <PublicRoute restricted={true} path="/login" component={ Login } user={ user } />
        <PublicRoute restricted={true} path="/register" exact={ true } component={ Register } user={ user } />
        <PublicRoute restricted={true} path="/regform" component={ RegisterForm } user={ user } />
        <PrivateRoute path="/content" component={ Content } user={ user } exact />
        <PrivateRoute path="/content/:subMenu" component={ Content } user={ user } exact />
        <PrivateRoute path="/content/:subMenu/:genreID" component={ Content } user={ user } exact />
        <PrivateRoute path="/account" component={ Account } user={ user } exact />
        <PrivateRoute path="/password" component={ UpdateUserPassword } user={ user } exact />
      </Switch>
    </>
  );
}

export default App;