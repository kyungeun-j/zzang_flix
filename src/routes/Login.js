import React, { useState } from 'react'
import { useLocation, useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../_actions/userAction';
import Cookies from 'universal-cookie';
import axios from 'axios';


function Login() {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const cookies = new Cookies();

    const [loginError, setLoginError] = useState('');
    const [email, setEmail] = useState(location.state !== undefined ? location.state.email : '');
    const [password, setPassword] = useState('');

    const emailHandler = (e) => {
        setEmail(e.currentTarget.value);
    };

    const passwordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password})).then(res => {
            if (res.payload.result) {
                cookies.set('token', res.payload.token);
                // axios.defaults.headers.common['Authorization'] = `Bearer ${res.payload.token}`
                history.push({
                    pathname: '/content'
                })
            } else if (res.loginResult === 'email fail') {
                setLoginError('죄송합니다. 이 이메일 주소를 사용하는 계정을 찾을 수 없습니다. 다시 시도하시거나 새로운 계정을 등록하세요.')
            } else if (res.loginResult === 'password fail') {
                setLoginError('비밀번호를 잘못 입력하셨습니다. 다시 입력하시거나 비밀번호를 재설정하세요.')
            } else {
                setLoginError('죄송합니다. 로그인을 할 수 없습니다.')
            }
            })
    };

    return (
        <div>
            { loginError }
            <form onSubmit={ onSubmit }>
                <label>Email</label>
                <input type="email" value={ email } onChange={ emailHandler } required />

                <label>Password</label>
                <input type="password" value={ password } onChange={ passwordHandler } required />

                <button type="submit">Login</button>    
            </form>
            <Link to='/'>회원가입</Link>
        </div>
    );
}

export default Login;