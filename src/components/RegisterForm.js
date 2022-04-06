import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router';
import styled, { css } from 'styled-components';
import Cookies from 'universal-cookie';
import { registerUser, loginUser } from '../_actions/userAction';

const RegFormSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;
const RegFormContainer = styled.div`
    margin: 3.5rem 1rem 1rem;
    height: 26rem;
    width: 28rem;
    display: flex;
    flex-direction: column;
`;
const RegForm = styled.form`
    height: inherit;
    width: inherit;

    h1 {
        font-size: 32px;
        font-weight: 700;
        word-break: keep-all;
    }
    .subText {
        font-size: 18px;
        margin-top: 18px;
        margin-bottom: 8px;
    }
    .subText p {
        margin-top: 10px;
    }
`;
const RegFormInputSection = styled.section`
    margin-bottom: 16px;
`;
const RegFormInputDiv = styled.div`
    height: 60px;
    border: 1px solid #8c8c8c;
    border-radius: 2px;
    color: #8c8c8c;
    display: flex;
    flex-direction: column;
    padding: 0 8px;
    justify-content: space-evenly;

    // email/pw div를 눌렀을 때 input 나타남
    ${({ select }) => ( select &&
        css`
            ${ RegFormLabel } {
                font-size: 13px;
                font-weight: bold;
            }
            ${ RegFormInput } {
                display: block;
                background: none;
                border: 0;
                outline: none;
                font-size: 16px;
            }
        `
    )}
`;
const RegFormErrorLabel = styled.label`
    font-size: 13px;
    color: #b92d2b;
`;
const RegFormLabel = styled.label``;
const RegFormInput = styled.input`
    display: none;
`;
const RegisterButton = styled.button`
    height: 64px;
    border-radius: 3px;
    border: 0;
    color: white;
    background-color: #e50914;
    font-weight: 500;
    font-size: 24px;
    margin-top: 24px;
    width: inherit;
`;

function RegisterForm() {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const inputRef = useRef([]);

    const [email, setEmail] = useState(location.state.email);
    const [password, setPassword] = useState('');
    const [registerInfo, setRegisterInfo] = useState('');
    const [emailSelect, setEmailSelect] = useState(location.state !== undefined ? true : false);
    const [pwSelect, setPwSelect] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [pwError, setPwError] = useState('');

    useEffect(() => {
        if (emailSelect) inputRef.current[0].focus();
    }, [emailSelect]);
    useEffect(() => {
        if (pwSelect) inputRef.current[1].focus();
    }, [pwSelect]);

    const emailHandler = (e) => {
        setEmail(e.currentTarget.value);
    };
    const passwordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onRegisterHandler = (e) => {
        if (e.currentTarget.children[0].children[1].type === 'text') 
        {
            setEmailSelect(true);
        } 
        else if (e.currentTarget.children[0].children[1].type === 'password') 
        {
            setPwSelect(true);
        } 
    };

    const onTabKeyHandler = (e) => {
        if (e.key === "Tab") {
            e.preventDefault();
            setPwSelect(true);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (email === '' || email.indexOf('@') < 0 || email.indexOf('.', email.indexOf('@')) < 0) 
        {
            setEmailError('이메일 주소를 입력해 주세요.');
            inputRef.current[0].parentElement.style.border = '1px solid #b92d2b';
        } 
        else if (password.length < 4 || password.length > 60) 
        {
            setPwError('비밀번호를 입력해 주세요.');
            inputRef.current[1].parentElement.style.border = '1px solid #b92d2b';
        } 
        else 
        {
            registerUser({ userID: null, email, password }).then(res => {
                if (res.registerUser) 
                {
                    dispatch(loginUser({ email, password})).then(res => {
                        if (res.payload.result) 
                        {
                            cookies.set('token', res.payload.token);
                            history.push({
                                pathname: '/content'
                            });
                        } 
                        else 
                        {
                            history.push({
                                pathname: '/Register'
                            });
                        }
                    });
                } 
                else 
                {
                    setRegisterInfo('죄송합니다. 회원가입을 할 수 없습니다.');
                }
            });
        }
    };

    return (
        <RegFormSection>
            <RegFormContainer>
            { registerInfo }
                <RegForm onSubmit={ onSubmit }>
                    <h1>비밀번호를 설정해 멤버십을 시작하세요.</h1>
                    <div className='subText'>
                        <p>몇 단계만 더 거치면 넷플릭스 가입 완료!</p>
                        <p> 복잡한 단계는 모두 없앴습니다.</p>
                    </div>
                    <RegFormInputSection onClick={ onRegisterHandler } onKeyDown={ onTabKeyHandler }>
                        <RegFormInputDiv select={ emailSelect }>
                            <RegFormLabel>이메일 주소</RegFormLabel>
                            <RegFormInput type="text" value={ email } onChange={ emailHandler } ref={el => (inputRef.current[0] = el)} />
                        </RegFormInputDiv>
                        <RegFormErrorLabel>{ emailError }</RegFormErrorLabel>
                    </RegFormInputSection>
                    <RegFormInputSection onClick={ onRegisterHandler }>
                        <RegFormInputDiv select={ pwSelect }>
                            <RegFormLabel>비밀번호를 추가하세요</RegFormLabel>
                            <RegFormInput type="password" value={ password } onChange={ passwordHandler } ref={el => (inputRef.current[1] = el)} />
                        </RegFormInputDiv>
                        <RegFormErrorLabel>{ pwError }</RegFormErrorLabel>
                    </RegFormInputSection>
                    <RegisterButton>가입하기</RegisterButton>
                </RegForm>
            </RegFormContainer>
        </RegFormSection>
    );
}

export default RegisterForm;