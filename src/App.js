
import React, { useState, useEffect, Suspense } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Route } from 'react-router';
import { Link, Switch } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import Content from './routes/Content';
import Register from './routes/Register/Register';
import RegisterForm from './routes/Register/RegisterForm';
import Cookies from 'universal-cookie';
import { logoutUser } from '../src/_actions/userAction';

function App() {
  const cookies = new Cookies();
  const history = useHistory();
  const dispatch = useDispatch();
  let user = useSelector(state => state.user);

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
      <ul>
        <li>
          <Link to={ user.isLogin ? '/content' : '/' }>로고</Link>
        </li>
        <li>
          { user.isLogin ? <button onClick={ onClick }>로그아웃</button> : <Link to={ '/login' }>로그인</Link> }
        </li>
      </ul>
      <Route path="/" exact={ true } component={ Home } />
      <Route path="/login" component={ Login } />
      <Switch>
          <Route path="/register" exact={ true } component={ Register } />
          <Route path="/register/regform" component={ RegisterForm } />
      </Switch>
      
      <Route path="/content" component={ Content } />
    </>
  );
}
export default App;