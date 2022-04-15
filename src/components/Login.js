import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../_actions/userAction';
import Cookies from 'universal-cookie';
import styled, { css } from 'styled-components';

const LoginSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
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

    ${({ loginError }) => 
        ( loginError != '' &&
            css `
                height: 34rem;
            `
        )
    }
`;
const LoginForm = styled.form`
    height: 18rem;
    width: 19.3rem;

    h1 {
        color: white;
        margin-bottom: 28px;
    }
`;
const LoginLabel = styled.label``;
const LoginInput = styled.input`
    display: none;
`;
const LoginInputDiv = styled.div`
    height: 3rem;
    border: 0;
    border-bottom: 2px solid #333333;
    border-radius: 5px;
    background-color: #333333;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    color: #8c8c8c;
    justify-content: space-evenly;

    // email/pw div를 눌렀을 때 input 나타남
    ${({ select }) => ( select &&
        css`
            ${ LoginLabel } {
                font-size: 11px;
            }
            ${ LoginInput } {
                display: block;
                background: none;
                border: 0;
                outline: none;
                color: white;
                font-size: 16px;
            }
        `
    )}
`;
const LoginButton = styled.button`
    height: 3rem;
    border-radius: 5px;
    border: 0;
    color: white;
    background-color: #e50914;
    font-size: 1.1rem;
    font-weight: bold;
    margin-top: 24px;
    width: inherit;
`;
const LoginErrorDiv = styled.div`
    ${({ loginError }) => ( loginError == '' &&
        css `
            display: none;
        `
    )}

    background-color: #E87C03;
    color: white;
    padding: 0.5rem 1rem;
    font-size: 14px;
    border-radius: 5px;
    word-break: keep-all;
    margin-bottom: 16px;
`;
const RegisterLink = styled.div`
    width: 19.3rem;

    & span {
        color: #737373;
    }
    .registerA {
        color: white;
        text-decoration: none;
    }
`;
const LoginErrorLabel = styled.label`
    font-size: 13px;
    color: #E87C03;
`;
const LoginInputSection = styled.section`
    margin-bottom: 16px;
`;

function Login() {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const inputRef = useRef([]); // input focus
    const cookies = new Cookies();

    const [loginError, setLoginError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [pwError, setPwError] = useState('');
    const [email, setEmail] = useState(location.state !== undefined ? location.state.email : '');
    const [password, setPassword] = useState('');
    const [emailSelect, setEmailSelect] = useState(location.state !== undefined ? true : false);
    const [pwSelect, setPwSelect] = useState(false);

    useEffect(() => {
        if (emailSelect) inputRef.current[0].focus();
    }, [emailSelect]);
    useEffect(() => {
        if (pwSelect) inputRef.current[1].focus();
    }, [pwSelect]);
    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if (e.key === "Tab") {
                e.preventDefault();
                !emailSelect ? setEmailSelect(true) : setPwSelect(true);
            }               
        });
    }, [emailSelect, pwSelect]);

    const emailHandler = (e) => {
        setEmail(e.currentTarget.value);
    };
    const passwordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onLoginHandler = (e) => {
        if (e.currentTarget.children[0].children[1].type === 'text') {
            setEmailSelect(true);
        } else if (e.currentTarget.children[0].children[1].type === 'password') {
            setPwSelect(true);
        } 
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (email === '' || email.indexOf('@') < 0 || email.indexOf('.', email.indexOf('@')) < 0) 
        {
            setEmailError('정확한 이메일 주소나 전화번호를 입력하세요.');
            inputRef.current[0].parentElement.style.borderBottom = '2px solid #E87C03';
            inputRef.current[1].parentElement.style.borderBottom = '2px solid #333333';
        } 
        else if (password.length < 4 || password.length > 60) 
        {
            setPwError('비밀번호는 4 - 60자 사이여야 합니다.');
            inputRef.current[0].parentElement.style.borderBottom = '2px solid #333333';
            inputRef.current[1].parentElement.style.borderBottom = '2px solid #E87C03';
        } 
        else 
        {
            if (emailError !== '' || pwError !== '') setEmailError(''); setPwError('');

            dispatch(loginUser({ email, password})).then(res => {
                if (res.payload.result) 
                {
                    // var date = new Date();
                    // date.setMinutes(date.getMinutes() + 1);
                    // cookies.set('token', res.payload.token, {
                    //     path: '/',
                    //     expires: date.toUTCString()
                    // });
                    history.push({
                        pathname: '/content'
                    });
                } 
                else 
                {
                    if (res.payload.msg === 'email fail') 
                    {
                        setLoginError('죄송합니다. 이 이메일 주소를 사용하는 계정을 찾을 수 없습니다. 다시 시도하시거나 새로운 계정을 등록하세요.');
                        inputRef.current[0].parentElement.style.borderBottom = '2px solid #E87C03';
                        inputRef.current[1].parentElement.style.borderBottom = '2px solid #333333';
                    }
                    else if (res.payload.msg === 'password fail') 
                    {
                        setLoginError('비밀번호를 잘못 입력하셨습니다. 다시 입력하시거나 비밀번호를 재설정하세요.');
                        inputRef.current[0].parentElement.style.borderBottom = '2px solid #333333';
                        inputRef.current[1].parentElement.style.borderBottom = '2px solid #E87C03';
                    } 
                    else 
                    {
                        setLoginError('죄송합니다. 로그인을 할 수 없습니다.');
                    }
                }
            });
        }
    };

    return (
        <LoginSection onClick={ onLoginHandler }>
            <LoginContainer loginError={ loginError }>
                <LoginForm onSubmit={ onSubmit }>
                    <h1>로그인</h1>
                    <LoginErrorDiv loginError={ loginError }>{ loginError }</LoginErrorDiv>
                    <LoginInputSection onClick={ onLoginHandler }>
                        <LoginInputDiv select={ emailSelect }>
                            <LoginLabel>이메일 주소</LoginLabel>
                            <LoginInput type="text" value={ email } onChange={ emailHandler } ref={el => (inputRef.current[0] = el)} />
                        </LoginInputDiv>
                        <LoginErrorLabel>{ emailError }</LoginErrorLabel>
                    </LoginInputSection>
                    <LoginInputSection onClick={ onLoginHandler }>
                        <LoginInputDiv select={ pwSelect }>
                            <LoginLabel>비밀번호</LoginLabel>
                            <LoginInput type="password" value={ password } onChange={ passwordHandler } ref={el => (inputRef.current[1] = el)} />
                        </LoginInputDiv>
                        <LoginErrorLabel>{ pwError }</LoginErrorLabel>
                    </LoginInputSection>
                    <LoginButton type="submit">로그인</LoginButton>   
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