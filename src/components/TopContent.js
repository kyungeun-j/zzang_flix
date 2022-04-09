import React from 'react';
import styled from 'styled-components';
import { AiOutlineInfoCircle } from "react-icons/ai";

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
    margin-left: 4vw;
    width: 40vw;
    margin-top: 9%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    
    img {
        width: inherit;
        margin-bottom: 2vw;
    }
    .contentInfo {
        font-size: 1.5vw;
        font-weight: 400;
        word-break: keep-all;
        margin-bottom: 2vw;
        line-height: 1.3;
    }
    .infoBtn {
        background: #6D6D6EB3;
        width: fit-content;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.3vw;
        font-weight: bold;
        padding: 0.6vw 1.6vw;
        border-radius: 5px;
        .icon {
            font-size: 2vw;
            margin-right: 1vw;
        }
        .contentAge {
            background: #6D6D6EB3;
            border-left: 2px solid;
            width: fit-content;
            padding-right: 3vw;
            height: 2vw;
            position: absolute;
            right: calc(40vw - 100vw + 4vw);
            padding-left: 0.5vw;
            display: flex;
            align-items: center;
            font-weight: 400;
        }
    }
    .infoBtn:hover {
        cursor: pointer;
        background: #6d6d6e8f;
    }
`;

function TopContent({ randomContent, modalHandler }) {
    return (
    <>
        <TopContentContainer>
            <BgImg style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0) 73%, rgba(0, 0, 0, 1)), linear-gradient(to left, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.45)), url('+randomContent.bgImgDeskTop+')'}}></BgImg>
        </TopContentContainer>
        <BgInfo>
            <img src={ randomContent.logoImg } />
            <p className='contentInfo'>{ randomContent.info }</p>
            <p className='infoBtn'>
                <AiOutlineInfoCircle className='icon' />
                <span onClick={ () => { modalHandler(true, randomContent)} }>상세 정보</span>

                <span className='contentAge'>{ randomContent.age }</span>
            </p>
        </BgInfo>
    </>
    );
}

export default TopContent;