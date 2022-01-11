import React, { useState } from 'react'
import { useLocation, useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../_actions/userAction';
import Cookies from 'universal-cookie';
import styled from 'styled-components';

const LoginSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
`;
const LoginContainer = styled.div`
    margin: 1rem;
    background-color: rgba(0,0,0,.75);
    height: 29rem;
    width: 28rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;
const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 18rem;
    width: 19.2rem;

    h1 {
        color: white;
    }
`;
const LoginInput = styled.input`
    height: 3rem;
    border: 0;
    border-bottom: 2px solid #E87C03;
    border-radius: 5px;
    background-color: #333333;
`;

const LoginButton = styled.button`
    height: 3rem;
    border-radius: 5px;
    border: 0;
    color: white;
    background-color: #e50914;
    font-size: 1.1rem;
    font-weight: bold;
`;

const RegisterLink = styled.div`

& span {
    color: #737373;
}
.registerA {
    color: white;
    text-decoration: none;
}
`;

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
        <LoginSection>
            <LoginContainer>
                <LoginForm onSubmit={ onSubmit }>
                    <h1>로그인</h1>
                    <LoginInput type="email" value={ email } onChange={ emailHandler } required />
                    <LoginInput type="password" value={ password } onChange={ passwordHandler } required />

                    <LoginButton type="submit">로그인</LoginButton>   
                    { loginError } 
                </LoginForm>
                <RegisterLink>
                    <span>Netflix 회원이 아닌가요? </span>
                    <Link className='registerA' to='/'>지금 가입하세요.</Link>
                </RegisterLink>
            </LoginContainer>
        </LoginSection>
    );
}

export default Login;