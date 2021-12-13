
import React from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import Content from './routes/Content';
import Welecome from './routes/Welecome';
import Register from './routes/Register/Register';
import RegisterForm from './routes/Register/RegisterForm';

function App() {
  return (
    <>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/login">로그인</Link>
        </li>
      </ul>
      <Route path="/" exact={ true } component={ Home } />
      <Route path="/login" component={ Login } />
      <Route path="/register" exact={ true } component={ Register } />
      <Route path="/register/regform" component={ RegisterForm } />
      <Route path="/welecome" component={ Welecome } />
      <Route path="/content" component={ Content } />
    </>
  );
}

export default App;
