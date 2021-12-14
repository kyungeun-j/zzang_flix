import React, { useState } from 'react'
// import { useDispatch } from 'react-redux';
import { useHistory, withRouter } from 'react-router';
import styled from 'styled-components';
import { compareEmail } from '../../actions/userAction';

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
                if (res.compareEmail) {
                    history.push({
                        pathname: '/login',
                        state: { email }
                    })
                } else {
                    history.push({
                        pathname: '/register/regform',
                        state: { email }
                    })
                }
            })
    };

    return (
        <div>
            {/* <form onSubmit={ onSubmit }> */}
                {/* <label>Name</label>
                <input type="name" value={ name } onChange={ nameHandler } required /> */}
                <Email>
                    <label>Email</label>
                    <input type="email" value={ email } onChange={ emailHandler } required />
                </Email>
                {/* <p>{ compareEmail }</p> */}

                {/* <label>Password</label>
                <input type="password" value={ password } onChange={ passwordHanlder } required />

                <label>ConfirmPasword</label>
                <input type="password" value={ confirmPassword } onChange={ confirmPasswordHandler } required />
                <p>{ comparePassword }</p>

                <label>Phone</label>
                <input type="phone" value={ phone } onChange={ phoneHandler } required /> */}

                <br />
                <button onClick={ onClick }>시작하기</button>
            {/* </form> */}
        </div>
    );
}

export default withRouter(Register);