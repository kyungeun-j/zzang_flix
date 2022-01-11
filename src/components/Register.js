import React, { useState } from 'react'
// import { useDispatch } from 'react-redux';
import { useHistory, withRouter } from 'react-router';
import styled from 'styled-components';
import { compareEmail } from '../_actions/userAction';

const Email = styled.div`
    label {
        display: none;
    }
`;

function Register() {
    const history = useHistory();
    
    const [email, setEmail] = useState('');

    const emailHandler = (e) => {
        setEmail(e.currentTarget.value);
    };

    const onClick = (e) => {
        e.preventDefault();
            compareEmail({email}).then(res => {
                console.log(res.compareEmail)
                if (res.compareEmail) {
                    history.push({
                        pathname: '/login',
                        state: { email }
                    })
                } else {
                    history.push({
                        pathname: '/regform',
                        state: { email }
                    })
                }
            })
    };

    return (
        <div>
            <Email>
                <label>Email</label>
                <input type="email" value={ email } onChange={ emailHandler } required />
            </Email>

            <br />
            <button onClick={ onClick }>시작하기</button>
        </div>
    );
}

export default Register;