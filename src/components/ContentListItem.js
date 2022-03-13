import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentDetailModal from './ContentDetailModal';

const ContentImg = styled.img`
    width: inherit;
    height: inherit;
`;
const ContentInfo = styled.section`
    display: none;
    width: inherit;
    background: #202020;
    border-radius: 3px;
    overflow: hidden;
    padding-bottom: 5vh;
    z-index: 1;

    div {
        display: flex;
        margin: 0 2vh;
        justify-content: space-between;
    }
`;
const ContentDiv = styled.div`
    background: #202020;
    width: 18vw;
    height: 10vw;
    border-radius: 3px;
    margin: 2.5px;
    overflow-y: clip;

    transition: all .3s linear .3s;

    &:hover {
        height: auto;
        transform: scale(1.5);
        margin-left: calc(18vw - calc(18vw * 1.5 / 2));

        ${ContentInfo} {
            display: block;
        }
    }
`;


function ContentListItem({ content }) {
    const { bgImgDeskTop, bgImgMobile, img, title, age, duration } = content;
    const [detailOpen, setDetailOpen] = useState(false);

    const detailHandler = () => {
        setDetailOpen(true);
    }

    return (
        <>
            <ContentDiv>
                <ContentImg src={ img } alt={ title } /> 
                <ContentInfo>
                        <div>
                            <span>{ title }</span>
                            <span onClick={ detailHandler }>버튼</span>
                        </div>
                        <div>
                            <span>{ age }</span>
                            <span>{ duration }</span>
                        </div>
                    </ContentInfo>
            </ContentDiv>
            {
                detailOpen && <ContentDetailModal visible={detailOpen} />
            }
        </>
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