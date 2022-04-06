import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AccountSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;
const AccountContainer = styled.div`
    height: 60vh;
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
const UserInfoContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 3fr;
    margin-top: 2rem;

    .updateInfoLabel {
        font-size: 1.4em;
        color: #757575;
    }
    .updateInfoContainer {
        flex: 2;
    }
    .updateInfoContainer div:nth-child(1) {
        font-weight: 700;
        font-size: 1.2em;
    }
    .updateInfoContainer div:nth-child(2) {
        display: flex;
        justify-content: space-between;
        font-size: 1.2em;
        color: #757575;
        margin-top: 1rem;
    }
    .updateInfoContainer div:nth-child(2) a {
        color: #0073e6;
        text-decoration: none;
    }
`;

function Account({ user }) {
    return(
        <AccountSection>
            <AccountContainer>
                <h1>계정</h1> <hr />
                <UserInfoContainer>
                    <div className='updateInfoLabel'>정보</div>
                    <div className='updateInfoContainer'>
                        <div>{ user.userEmail }</div>
                        <div>
                            <span>비밀번호: ******</span>
                            <Link to='/password'>비밀번호 변경</Link>
                        </div>
                        
                    </div>
                </UserInfoContainer>
            </AccountContainer>
        </AccountSection>
    );
}

export default Account;