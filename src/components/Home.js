import React from 'react';
import Register from './Register';
import styled from 'styled-components';

const HomeSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
const HomeContainer = styled.div`
    width: 666px;
    height: 500px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        font-size: 3.15rem;
        margin-bottom: 0.8rem;
    }
    h2 {
        font-size: 1.65rem;
        font-weight: 400;
        margin-bottom: 1.5rem;
    }
    h3 {
        font-size: 1.2rem;
        font-weight: 500;
        margin-bottom: 1rem;
    }
`;

function Home() {
    return (
        <HomeSection>
            <HomeContainer>
                <h1>영화와 시리즈를 무제한으로.</h1>
                <h2>다양한 디바이스에서 시청하세요. 언제든 해지하실 수 있습니다.</h2>
                <h3>시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일 주소를 입력하세요.</h3>
                <Register />
            </HomeContainer>
        </HomeSection>
    );
}

export default Home;