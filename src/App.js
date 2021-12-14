
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import Content from './routes/Content';
import Welecome from './routes/Welecome';
import Register from './routes/Register/Register';
import RegisterForm from './routes/Register/RegisterForm';

function App() {

  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('login_email') === null) {
      console.log(isLogin)
    } else {
      setIsLogin(true)
      console.log(isLogin)
    }
  })

  const onLogin = () => {
    if (isLogin) {
      // 로그인되어있을 때 로그아웃
      localStorage.removeItem('login_email')
      history.push('/')
    } else {
      // 로그아웃되어있을 때 로그인
      history.push('/login')
    }
  }

  return (
    <>
      <ul>
        {console.log(isLogin)}
        <li>
          <Link to={ isLogin ? '/content' : '/' }>홈</Link>
        </li>
        <li>
          <button type='button' onClick={ onLogin }>{isLogin ? '로그아웃' : '로그인' }</button>
        </li>
      </ul>
      <Route path="/" exact={ true } component={ Home } />
      <Route path="/login" component={ Login } />
      <Route path="/register" exact={ true } component={ Register } />
      <Route path="/register/regform" component={ RegisterForm } />
      <Route path="/welecome" component={ Welecome } />
      <Route path="/content" component={ Content } isLogin={ isLogin } />
    </>
  );
}

export default App;
