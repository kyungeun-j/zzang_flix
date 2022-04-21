import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaChevronDown } from "react-icons/fa";

const ContentImg = styled.img`
    width: inherit;
    height: inherit;
    border-radius: 3px;
`;
const ContentInfo = styled.section`
    display: none;
    width: 220px;
    height: 130px;
    position: absolute;
    top: 0;
    left:0;
    right:0;
    background: #202020;
    border-radius: 3px;
    overflow: hidden;
    z-index: 1;
    flex-direction: column;
    transition: all ease .5s 0s;

    &:hover {
        width: 325px;
        height: 300px;
        top: -50%;
        z-index: 10;
        left: ${props => props.hoverLeft}%;
    }
    img {
        width: inherit;
    }
    section {
        height: calc(1152 / 2048 * 100%);
        margin: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    div:nth-child(1) {
        font-size: 19px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    div:nth-child(2) {
        font-size: 11px;
    }
    .ageEle {
        border: 0.1px solid;
        padding: 1px 6px;
        margin-right: 10px;
    }
    svg {
        font-size: 16px;
        padding: 8px;
        border: 2px solid gray;
        border-radius: 2rem;
    }
    svg:hover {
        border: 2px solid white;
        cursor: pointer;
    }
`;
const ContentDiv = styled.div`
    position: relative;
    background: #202020;
    width: ${props => props.imgWidth}px;
    border-radius: 3px;
    margin: 2.5px;

    &:hover {
        ${ContentInfo} {
            display: ${props => props.hoverFlex};
        }
    }
`;

function ContentListItem({ content, modalHandler, imgWidth }) {
    const { bgImgDeskTop, img, title, age, duration, id } = content;
    const [hoverCenter, setHoverCenter] = useState(0);
    const [hoverFlex, setSectionFlex] = useState('');
    
    const mouseOver = (e) => {
        const parentEleLeft = e.currentTarget.getBoundingClientRect().left - e.currentTarget.parentElement.children[0].getBoundingClientRect().left;
        const targetWidth = e.currentTarget.getBoundingClientRect().right - e.currentTarget.getBoundingClientRect().left;
        const visibleImgCount = Math.floor(window.innerWidth / targetWidth);
        if (parentEleLeft == 0) {
            setHoverCenter(0);
        } else if (parentEleLeft > targetWidth * (visibleImgCount - 1)) {
            setHoverCenter(-50);
        } else {
            setHoverCenter(-25);
        }
        setSectionFlex('flex')
    }

    return (
        <ContentDiv onMouseOver={ mouseOver } imgWidth={ imgWidth } hoverFlex={ hoverFlex }>
            <ContentImg src={ img } alt={ title } /> 
            <ContentInfo hoverLeft={ hoverCenter }>
                    <img src={ bgImgDeskTop } />
                    <section>
                        <div>
                            <span>{ title }</span>
                            <span onClick={ () => { 
                                    modalHandler(true, content);
                                    setSectionFlex('')
                            }}>
                                <FaChevronDown />
                            </span>
                        </div>
                        <div>
                            <span className='ageEle'>{ age }</span>
                            <span className='durationEle'>{ duration }</span>
                        </div>
                    </section>
                </ContentInfo>
        </ContentDiv>
    );
}

ContentListItem.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.string,
    age: PropTypes.string,
    duration: PropTypes.string,
    info: PropTypes.string,
    role: PropTypes.string,
    genreID: PropTypes.number
}

export default ContentListItem;