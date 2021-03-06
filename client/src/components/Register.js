import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { compareEmail } from '../_actions/userAction';

const RegisterSection = styled.section`
    width: 600px;
    height: 65px
`;
const RegisterContainer = styled.div`
    display: flex;
    height: 61px;
    border-radius: 2px;
    overflow: hidden;
`;
const RegisterInputDiv = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    background-color: white;
    justify-content: center;
    padding: 11px;

    // email div를 눌렀을 때 input 나타남
    ${({ select }) => ( select &&
        css`
        ${ RegisterLabel } {
            font-size: 11px;
        }
        ${ RegisterInput } {
            display: block;
            background: none;
            border: 0;
            outline: none;
            font-size: 16px;
        }
        `
    )}
`;
const RegisterLabel = styled.label`
    color: gray;
`;
const RegisterInput = styled.input`
    display: none;
`;
const RegisterBtn = styled.button`
    font-size: 1.6rem;
    padding: 0 2rem;
    background-color: #e50914;
    color: white;
    border-style: none;
`;
const EmailErrorDiv = styled.div`
    color: #ffa00a;
`;

function Register() {
    const history = useHistory();
    const inputRef = useRef();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [select, setSelect] = useState(false);

    useEffect(() => {
        if (select) inputRef.current.focus();
    }, [select]);

    const emailHandler = (e) => {
        setEmail(e.currentTarget.value);
    };

    const onRegisterHandler = (e) => {
        if (e.currentTarget.children[1].type === 'email') 
        {
            setSelect(true);
        }
    };

    const onClick = (e) => {
        e.preventDefault();
        if (email === '' || email.indexOf('@') < 0 || email.indexOf('.', email.indexOf('@')) < 0) 
        {
            setSelect(true);
            setEmailError('이메일 주소를 입력하세요.');
        } 
        else 
        {
            compareEmail({email}).then(res => {
                if (res.compareResult) 
                {
                    history.push({
                        pathname: '/login',
                        state: { email }
                    });
                } 
                else 
                {
                    history.push({
                        pathname: '/regform',
                        state: { email }
                    });
                }
            });
        }
    };

    return (
        <>
        <RegisterSection>
            <RegisterContainer>
                <RegisterInputDiv onClick={ onRegisterHandler } select={ select }>
                    <RegisterLabel>이메일 주소</RegisterLabel>
                    <RegisterInput type="email" value={ email } onChange={ emailHandler } ref={ inputRef } required />
                </RegisterInputDiv>
                <RegisterBtn onClick={ onClick }>시작하기</RegisterBtn>
            </RegisterContainer>
            <EmailErrorDiv>{ emailError }</EmailErrorDiv>
        </RegisterSection>
        </>
    );
}

export default Register;