import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

function Login() {
    const location = useLocation();
    const dispatch = useDispatch();

    const [email, setEmail] = useState(location.state.email);
    const [password, setPassword] = useState('');

    const emailHandler = (e) => {
        setEmail(e.currentTarget.value);
    };

    const passwordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
            dispatch(loginUser({ userID: null, email, password })).then(res => {
                console.log(res)
                // history.push({
                //     pathname: '/content',
                //     state: { email }
                // })
                // if (res.compareEmail) {
                //     history.push({
                //         pathname: '/login',
                //         state: { email }
                //     })
                // } else {
                //     history.push({
                //         pathname: '/login',
                //         state: { email }
                //     })
                // }
            })
    };

    return (
        <div>
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