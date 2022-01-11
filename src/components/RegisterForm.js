import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router';
import Cookies from 'universal-cookie';
import { registerUser, loginUser } from '../_actions/userAction';

function RegisterForm() {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const cookies = new Cookies();

    const [email, setEmail] = useState(location.state.email);
    const [password, setPassword] = useState('');
    const [registerInfo, setRegisterInfo] = useState('');

    const emailHandler = (e) => {
        setEmail(e.currentTarget.value);
    };

    const passwordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        registerUser({ userID: null, email, password }).then(res => {
            if (res.registerUser) {
                dispatch(loginUser({ email, password})).then(res => {
                    if (res.payload.result) {
                        cookies.set('token', res.payload.token);
                        history.push({
                            pathname: '/content'
                        })
                    } else {
                        history.push({
                            pathname: '/login'
                        })
                    }
                })
            } else {
                setRegisterInfo('죄송합니다. 회원가입을 할 수 없습니다.')
            }
        })
    };

    return(
        <>
            { registerInfo }
            <form onSubmit={ onSubmit }>
                <label>Email</label>
                <input type="email" value={ email } onChange={ emailHandler } required />

                <label>Password</label>
                <input type="password" value={ password } onChange={ passwordHandler } required />

                <br />
                <button>가입하기</button>
            </form>
        </>
    )
}

export default RegisterForm;