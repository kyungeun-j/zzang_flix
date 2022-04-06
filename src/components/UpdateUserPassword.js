import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const UpdatePasswordSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;
const UpdatePasswordContainer = styled.div`
    height: 70vh;
    width: 71vw;
    display: flex;
    flex-direction: column;

    h1 {
        font-weight: inherit;
        font-size: 2.5em;
        color: #333;
        margin-bottom: 0.5em;
    }
`;

const UpdateInputSection = styled.section`
    margin-bottom: 57px;
    width: 50%;
    background: white;
`;
const UpdateInputDiv = styled.div`
    height: 48px;
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
            ${ UpdateLabel } {
                font-size: 13px;
            }
            ${ UpdateInput } {
                display: block;
                background: none;
                border: 0;
                outline: none;
                font-size: 16px;
            }
        `
    )}
`;
const UpdateErrorLabel = styled.label`
    font-size: 13px;
    color: #b92d2b;
`;
const UpdateLabel = styled.label`
    font-size: initial;
`;
const UpdateInput = styled.input`
    display: none;
`;
const UpdateSaveBtn = styled.button`
    background-color: #0f84fa;
    color: #fff;
`;
const UpdateCancelBtn = styled.button`
    margin-left: 0.8rem;
    color: #333;
    background: #ccc;
`;
const BtnSection = styled.section`
    button {
        padding: 0.8rem 2.5rem;
        border: 0;
        border-radius: 3px;
        box-shadow: 1px 2px 2px -2px rgb(0 0 0 / 15%);
    }
    
    
    }
`;

function UpdateUserPassword({ user }) {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [pwSelect, setPwSelect] = useState(false);
    const [newPwSelect, setNewPwSelect] = useState(false);
    const [newPwConfirmSelect, setNewPwConfirmSelect] = useState(false);
    const [pwError, setPwError] = useState('');
    const [newPwError, setNewPwError] = useState('');
    const [newPwConfirmError, setNewPwConfirmError] = useState('');
    const inputRef = useRef([]);

    useEffect(() => {
        if (pwSelect) inputRef.current[0].focus();
    }, [pwSelect]);
    useEffect(() => {
        if (newPwSelect) inputRef.current[1].focus();
    }, [newPwSelect]);
    useEffect(() => {
        if (newPwConfirmSelect) inputRef.current[2].focus();
    }, [newPwConfirmSelect]);

    const passwordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };
    const newPasswordHandler = (e) => {
        setNewPassword(e.currentTarget.value);
    };
    const newPasswordConfirmHandler = (e) => {
        setNewPasswordConfirm(e.currentTarget.value);
    };

    const onInputClickHandler = (e) => {
        if (e.currentTarget.children[0].id === '0')   setPwSelect(true);
        else if (e.currentTarget.children[0].id === '1')   setNewPwSelect(true);
        else if (e.currentTarget.children[0].id === '2')   setNewPwConfirmSelect(true);
    };

    return(
        <UpdatePasswordSection>
            <UpdatePasswordContainer>
                <h1>비밀번호 변경</h1>
                <UpdateInputSection onClick={ onInputClickHandler }>
                    <UpdateInputDiv select={ pwSelect } id='0'>
                        <UpdateLabel>기존 비밀번호</UpdateLabel>
                        <UpdateInput type="password" value={ password } onChange={ passwordHandler } ref={el => (inputRef.current[0] = el)} />
                    </UpdateInputDiv>
                    <UpdateErrorLabel>{ pwError }</UpdateErrorLabel>
                </UpdateInputSection>
                <UpdateInputSection onClick={ onInputClickHandler }>
                    <UpdateInputDiv select={ newPwSelect } id='1'>
                        <UpdateLabel>새 비밀번호</UpdateLabel>
                        <UpdateInput type="password" value={ newPassword } onChange={ newPasswordHandler } ref={el => (inputRef.current[1] = el)} />
                    </UpdateInputDiv>
                    <UpdateErrorLabel>{ newPwError }</UpdateErrorLabel>
                </UpdateInputSection>
                <UpdateInputSection onClick={ onInputClickHandler }>
                    <UpdateInputDiv select={ newPwConfirmSelect } id='2'>
                        <UpdateLabel>새 비밀번호 재입력</UpdateLabel>
                        <UpdateInput type="password" value={ newPasswordConfirm } onChange={ newPasswordConfirmHandler } ref={el => (inputRef.current[2] = el)} />
                    </UpdateInputDiv>
                    <UpdateErrorLabel>{ newPwConfirmError }</UpdateErrorLabel>
                </UpdateInputSection>

                <BtnSection>
                    <UpdateSaveBtn>저장</UpdateSaveBtn>
                    <UpdateCancelBtn>취소</UpdateCancelBtn>
                </BtnSection>
            </UpdatePasswordContainer>
        </UpdatePasswordSection>
    );
}

export default UpdateUserPassword;