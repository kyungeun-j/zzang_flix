
import React, { useState, useEffect, Suspense } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Route } from 'react-router';
import { useLocation } from 'react-router-dom';
import Home from './components/Home';
import Content from './components/Content';
import Login from './components/Login';
import Register from './components/Register';
import RegisterForm from './components/RegisterForm';
import Cookies from 'universal-cookie';
import { logoutUser } from '../src/_actions/userAction';
import loginbackground from '../src/static/images/loginBackground.jpeg';
import mainbackground from '../src/static/images/mainBackground.jpeg';
import { createGlobalStyle, css } from 'styled-components';
import Navigator from './components/Navigator';

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;  
}

body {
  ${({ location }) => 
    ( location =='/login' &&
        css `
        background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${loginbackground}) no-repeat left top / 139rem;
        `
      ||
      location == '/' &&
        css `
        background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.3) ,rgba(0,0,0,0.9)),url(${mainbackground}) no-repeat left 67% / cover;
        height: 100vh;
        `
      || 
      location != '/login' && location != '/' &&
        css`
        background: black;
        `
    )
  }
`

  function App() {

  const cookies = new Cookies();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  let user = useSelector(state => state.user);

  // const [isLogin, setIsLogin] = useState(false);

  //   useEffect(() => {
  //       setIsLogin(cookies.get('token') !== undefined ? true : false)
  //   }, [isLogin])

  //   console.log(location)
  return (
    <>
      <GlobalStyle location={ location.pathname } />
      <Navigator location={ location.pathname } user={ user }/>
      <Route path="/" exact={ true } component={ Home } />
      <Route path="/login" component={ Login } />
      <Route path="/register" exact={ true } component={ Register } />
      <Route path="/regform" component={ RegisterForm } />
      <Route path="/content" component={ Content } />
    </>
  );
}
export default App;