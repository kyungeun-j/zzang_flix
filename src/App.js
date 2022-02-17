
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Switch } from 'react-router-dom';
import Home from './components/Home';
import Content from './components/Content';
import Login from './components/Login';
import Register from './components/Register';
import RegisterForm from './components/RegisterForm';
import loginbackground from '../src/static/images/loginBackground.jpeg';
import mainbackground from '../src/static/images/mainBackground.jpeg';
import { createGlobalStyle, css } from 'styled-components';
import Navigator from './components/Navigator';
import GenreContent from './components/GenreContent';
import Cookies from 'universal-cookie';
import { loginCheck } from '../src/_actions/userAction';
import PrivateRoute from './components/route_control/PrivateRoute';
import PublicRoute from './components/route_control/PublicRoute';

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;  
}

body {
  ${({ location }) => 
    ( 
      location == '/' &&
        css `
        background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.3) ,rgba(0,0,0,0.9)),url(${mainbackground}) no-repeat left 67% / cover;
        height: 100vh;
        `
      ||
      location =='/login' &&
        css `
        background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${loginbackground}) no-repeat left top / 139rem;
        `
      ||
      location =='/regform' &&
        css `
        background: white;
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
  const cookies = new Cookies();
  const dispatch = useDispatch();
  let user = useSelector(state => state.user);

  // login check
  useEffect(() => {
      dispatch(loginCheck({ token: cookies.get('token') }))
  }, [])

  return (
    <>
      <GlobalStyle location={ location.pathname } />
      <Navigator user={ user } location={ location.pathname } />
      <Switch>
        // PrivateRoute: 회원만 접근 가능
        // PublicRoute: 모든 사용자 접근 가능
        // restricted :: true: 로그인 여부 관계없이 접근 가능 / false: 로그인 상태에선 접근 불가능
        <PublicRoute restricted={true} path="/" component={ Home } user={ user } exact />
        <PublicRoute restricted={true} path="/login" component={ Login } user={ user } />
        <PublicRoute restricted={true} path="/register" exact={ true } component={ Register } user={ user } />
        <PublicRoute restricted={true} path="/regform" component={ RegisterForm } user={ user } />
        <PrivateRoute path="/content" component={ Content } user={ user } exact />
        <PrivateRoute path="/content/:subMenu" component={ GenreContent } user={ user } exact />
      </Switch>
    </>
  );
}
export default App;