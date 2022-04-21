import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { compareEmail, updatePassword } from '../_actions/userAction';

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
    margin-bottom: 55px;
    width: 50%;
`;
const UpdateInputDiv = styled.div`
    height: 48px;
    border: 1px solid ${ props => props.borderStyle };
    border-radius: 2px;
    color: #8c8c8c;
    display: flex;
    flex-direction: column;
    padding: 0 8px;
    justify-content: space-evenly;
    background: white;

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
        padding: 1rem 2.7rem;
        border: 0;
        border-radius: 2px;
        box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 27%);
        font-weight: bold;
    }
`;

function UpdateUserPassword({ user }) {
    const history = useHistory();
    const inputRef = useRef([]);
    const [newPwError, setNewPwError] = useState('');
    const [pwError, setPwError] = useState('');
    const [newPwConfirmError, setNewPwConfirmError] = useState('');
    const [inputValue, setInputValue] = useState({
        0: '',
        1: '',
        2: ''
    })
    const [inputSelect, setInputSelect] = useState({
        0: {
            select: false,
            borderColor: '#8c8c8c'
        },
        1: {
            select: false,
            borderColor: '#8c8c8c'
        },
        2: {
            select: false,
            borderColor: '#8c8c8c'
        }
    });
    
    useEffect(() => {
        if (inputSelect[0]['select']) 
        {
            inputRef.current[0].focus();
            inputFocusHandler(0);
        }
    }, [inputSelect[0]]);
    useEffect(() => {
        if (inputSelect[1]['select']) 
        {
            inputRef.current[1].focus();
            inputFocusHandler(1);
        }
    }, [inputSelect[1]]);
    useEffect(() => {
        if (inputSelect[2]['select']) 
        {
            inputRef.current[2].focus();
            inputFocusHandler(2);
        }
    }, [inputSelect[2]]);
    useEffect(() => {
        if (newPwError !== '' && inputValue[1] !== '')
        {
            setNewPwError('');
        }
        if (newPwConfirmError !== '' && inputValue[2] !== '')
        {
            setNewPwConfirmError('');
        }
    }, [inputValue]);

    const inputFocusHandler = (id) => {
        Object.keys(inputSelect).map(input => {
            if (input != id) {
                if (inputSelect[input]['select'] && inputValue[input] === '') {
                    setInputSelect({
                        ...inputSelect,
                        [input]: {
                            select: false,
                            borderColor: '#8c8c8c'
                        }
                    });
                }
            }
        });
    };
    const inputValueHandler = (e) => {
        setInputValue({
            ...inputValue,
            [e.currentTarget.parentElement.id]: e.currentTarget.value
        });
        setInputSelect({
            ...inputSelect,
            [e.currentTarget.parentElement.id]: {
                select: true,
                borderColor: e.currentTarget.value.length < 4 || e.currentTarget.value.length > 60 ? '#0071eb' : '#5fa53f'
            }
        });
    };
    const inputClickHandler = (e) => {
        setInputSelect({
            ...inputSelect,
            [e.currentTarget.children[0].id]: {
                select: true,
                borderColor: '#0071eb'
            }
        });
    };
    const updatePWHandler = () => {
        const emptyInputID = Object.keys(inputValue).filter(input => inputValue[input] === '');
        const inputSelectobj = {};

        Object.keys(inputValue).map(input => {
            if (inputValue[input] === '')
            {
                inputSelectobj[input] = {
                    select: input == Math.min.apply(null, emptyInputID) ? true : false,
                    borderColor: input == 0 ? '#0071eb' : '#b92d2b'
                }
            }
            else
            {
                inputSelectobj[input] = inputSelect[input];
            }
        });
        if (inputValue[1] === '' || (inputValue[1].length < 4 || inputValue[1].length > 60)) setNewPwError('비밀번호는 4 - 60자 사이여야 합니다.');
        if (inputValue[2] === '' || inputValue[1] !== inputValue[2]) 
        {
            setNewPwConfirmError('새 비밀번호와 일치해야 합니다.');
        }
        setInputSelect(inputSelectobj);

        if (emptyInputID.length === 0)
        {
            compareEmail({ email: user.userEmail }).then(res => {
                if(inputValue[0] === res.userPW && (inputValue[1].length >= 4 || inputValue[1].length <= 60) && inputValue[1] === inputValue[2])
                {
                    updatePassword({ password: inputValue[2], email: user.userEmail}).then(res => {
                        if (res.updateResult)
                        {
                            history.push({
                                pathname: '/account',
                                state: { info: 'password update success' }
                            });
                        }
                    })
                }
                else
                {
                    setPwError('비밀번호를 잘못 입력하셨습니다.');
                    setInputSelect({
                        ...inputSelect,
                        [0]: {
                            select: true,
                            borderColor: '#b92d2b'
                        }
                    });
                }
            });
        }
        
    };

    return(
        <UpdatePasswordSection>
            <UpdatePasswordContainer>
                <h1>비밀번호 변경</h1>
                <UpdateInputSection onClick={ inputClickHandler }>
                    <UpdateInputDiv select={ inputSelect[0]['select'] } borderStyle={ inputSelect[0]['borderColor'] } id='0'>
                        <UpdateLabel>기존 비밀번호</UpdateLabel>
                        <UpdateInput type="password" value={ inputValue['0'] } onChange={ inputValueHandler } ref={el => (inputRef.current[0] = el)} />
                    </UpdateInputDiv>
                    <UpdateErrorLabel>{ pwError }</UpdateErrorLabel>
                </UpdateInputSection>
                <UpdateInputSection onClick={ inputClickHandler }>
                    <UpdateInputDiv select={ inputSelect[1]['select'] } borderStyle={ inputSelect[1]['borderColor'] } id='1'>
                        <UpdateLabel>새 비밀번호</UpdateLabel>
                        <UpdateInput type="password" value={ inputValue['1'] } onChange={ inputValueHandler } ref={el => (inputRef.current[1] = el)} />
                    </UpdateInputDiv>
                    <UpdateErrorLabel>{ newPwError }</UpdateErrorLabel>
                </UpdateInputSection>
                <UpdateInputSection onClick={ inputClickHandler }>
                    <UpdateInputDiv select={ inputSelect[2]['select'] } borderStyle={ inputSelect[2]['borderColor'] } id='2'>
                        <UpdateLabel>새 비밀번호 재입력</UpdateLabel>
                        <UpdateInput type="password" value={ inputValue['2'] } onChange={ inputValueHandler } ref={el => (inputRef.current[2] = el)} />
                    </UpdateInputDiv>
                    <UpdateErrorLabel>{ newPwConfirmError }</UpdateErrorLabel>
                </UpdateInputSection>

                <BtnSection>
                    <UpdateSaveBtn onClick={ updatePWHandler }>저장</UpdateSaveBtn>
                    <UpdateCancelBtn>취소</UpdateCancelBtn>
                </BtnSection>
            </UpdatePasswordContainer>
        </UpdatePasswordSection>
    );
}

export default UpdateUserPassword;