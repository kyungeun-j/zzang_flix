import React, { useState } from 'react'
import { useLocation, useHistory } from 'react-router';
import { loginUser } from '../actions/userAction';

function Login() {
    const location = useLocation();
    const history = useHistory();

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
            loginUser({ email, password }).then(res => {
                console.log(res)
                if (res.loginResult === 'login success') {
                    localStorage.setItem('login_email', email)
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

                <br />
                <button>가입하기</button>
            </form>
        </div>
    );
}

export default Login;