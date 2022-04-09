import React from 'react';
import styled from 'styled-components';
import { BsXCircleFill } from "react-icons/bs";

const ModalWrapper = styled.div`
    display: ${(props) => (props.visible ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    position: fixed;
    inset: 0;
    top: 0;
    left: 0;
    background-color: rgb(0 0 0 / 50%);
    z-index: 10;
    width: 100%;
    height: 100%;
`;
const ModalOverlay = styled.div`
    display: ${(props) => (props.visible ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    position: fixed;
    inset: 0;
    top: 0;
    left: 0;
    background-color: rgb(0 0 0 / 50%);
    z-index: 10;
    width: 100%;
    height: 100%;
`;
const ModalInner = styled.div`
    position: absolute;
    width: 53vw;
    height: 84vh;
    background: rgb(32, 32, 32) no-repeat top / contain;
    background-image: linear-gradient(to bottom,rgb(0 0 0 / 0%) 17vw,#181818 32vw), url(${(props) => props.img});
    overflow: auto;
    border-radius: 5px;
    outline: none;
    z-index: 10;
    padding: 3rem;

    .modalClose {
        position: absolute;
        top: 0;
        right: 0;
        margin: 1rem;
        font-size: 2.5rem;
        color: black;
    }
    .modalClose:hover {
        cursor: pointer;
        transform: scale(1.1);
    }
    img {
        position: absolute;
        width: 50%;
        margin-top: calc(544 / 1280 * 58%);
    } 
    section {
        position: absolute;
        left: 0;
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 3rem;
        row-gap: 2rem;
        font-size: 18px;
        color: white;
        margin: calc(calc(544 / 1280 * 60%) + 16vw) 3rem 3rem;
    }
    .ageEle {
        border: 0.1px solid;
        margin-left: 10px;
        padding: 1px 6px;
    }
    .ageEle, .yearEle {
        font-size: 16px;
    }
    .roleEle {
        font-size: 14px;
    }
    .roleEle span {
        color: gray;
    }
`;

function ContentDetailModal({ modalVisible, modalHandler, content }) {
    const { bgImgDeskTop, logoImg, year, age, info, role } = content;

    return (
        <>
            <ModalWrapper visible={ modalVisible } />
            <ModalOverlay tabIndex="-1" visible={ modalVisible }>
                <ModalInner tabIndex="0" className="modal-inner" img={ bgImgDeskTop }>
                    <BsXCircleFill className='modalClose' onClick={ () => { modalHandler(false)} } />
                    <img src={ logoImg } />
                    <section>
                        <div>
                            <span className='yearEle'>{ year }</span>
                            <span className='ageEle'>{ age }</span>
                        </div>
                        <div className='roleEle'>
                            <span>출연: </span> 
                            { role }
                        </div>
                        <div>{ info }</div>
                    </section>
                </ModalInner>
            </ModalOverlay>
        </>
    );
}

export default ContentDetailModal;