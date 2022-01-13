
import React, { useState, useEffect, Suspense } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Route } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Content from './components/Content';
import Login from './components/Login';
import Register from './components/Register';
import RegisterForm from './components/RegisterForm';
import Cookies from 'universal-cookie';
import { logoutUser } from '../src/_actions/userAction';
import logo from '../src/static/images/logo.png';
import loginbackground from '../src/static/images/loginBackground.jpeg';
import mainbackground from '../src/static/images/mainBackground.jpeg';
import styled, { createGlobalStyle, css } from 'styled-components';

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
    )
  }
`
const Nav = styled.nav`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  ${(props) =>
    props.location =='/login' &&
    css`
    padding: 3px 23px;
    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0));

    .login_outBtn {
      display: none;
      }
    `
    ||
    props.location !='/login' &&
    css`
    padding: 11px 39px;
    `
    }

  .logoImg {
    ${(props) =>
      props.location =='/login' &&
      css`
      width: 13rem;
          
      `
      ||
      props.location !='/login' &&
      css`
      width: 10.5rem;
          
      `
    }
  }

  .login_outBtn a, button {
    padding: 9px 17px;
    margin-right: 18px;
    border-radius: 4px;
    background-color: #e50914;
    text-decoration: none;
    color: white;
    margin: 0;
    border: 0;
  }
`;

function App() {
  const cookies = new Cookies();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  let user = useSelector(state => state.user);
  console.log(user)

  const onClick = (e) => {
    e.preventDefault();
    cookies.remove('token')
    dispatch(logoutUser({userCookie: cookies.get('token')}))

    history.push({
      pathname: '/'
    })
  };

  return (
    <>
      <GlobalStyle location={ location.pathname } />
      <Nav className='nav' location={ location.pathname }>
        <li>
          <Link to={ user.isLogin ? '/content' : '/' }>
            <img src={ logo } alt='logo' className='logoImg' />
          </Link>
        </li>
        <li className='login_outBtn'>
          { user.isLogin ? <button onClick={ onClick }>로그아웃</button> : <Link to={ '/login' }>로그인</Link> }
        </li>
      </Nav>
      <Route path="/" exact={ true } component={ Home } />
      <Route path="/login" component={ Login } />
      <Route path="/register" exact={ true } component={ Register } />
      <Route path="/regform" component={ RegisterForm } />
      <Route path="/content" component={ Content } />
    </>
  );
}
export default App;