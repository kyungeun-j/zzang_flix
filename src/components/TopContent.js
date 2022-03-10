import React from 'react';
import styled from 'styled-components';

const TopContentContainer = styled.section`
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    z-index: -1;
`;
const BgImg = styled.div`
    height: 0;
    padding-top: calc(1152 / 2048 * 100%);
    width: 100vw;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;
const BgInfo = styled.section`
    position: absolute;
    top: 0;
    color: white;
    margin: 5rem 0 0 4rem;
    width: 40%;

    img {
        width: 100%;
    }
`;

function TopContent({ randomContent }) {
    console.log(randomContent.bgImgDeskTop)

    return (
        <TopContentContainer>
            <BgImg style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0) 73%, rgba(0, 0, 0, 1)), url('+randomContent.bgImgDeskTop+')'}}></BgImg>
            <BgInfo>
                <img src={ randomContent.logoImg } />
                <p>{ randomContent.info }</p>
                <button>상세정보</button>
                <p>{ randomContent.age }</p>
            </BgInfo>
            
        </TopContentContainer>
    );
}

export default TopContent;