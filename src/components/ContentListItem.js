import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContentDiv = styled.div`
    width: 16rem;
    height: 9rem;
    margin: 6px;
    border-radius: 3px;

    div {
        display: none;
        height: 1rem;
        position: relative;
        padding: 9px;
        background: #1f1f1f;
    }

    span {
        font-size: 1px;
        border: 0.1px solid gray;
        padding: 2px 8px;
        position: absolute;
        top: 6px;
        text-align: center;
    }
`;
const ContentImg = styled.img`
    width: 18rem;
    height: intrinsic;
    border-radius: 3px;
    margin: 2.5px;
`;

function ContentListItem({ content }) {
    const { img, title, age } = content;

    // const onMouseOver = (e) => {
    //     e.currentTarget.children[1].style.display = 'block'
    //     e.currentTarget.sty
    //     // e.currentTarget.style.transform = 'scale(1.3)'
    //     // e.currentTarget.children[0].style.borderRadius = '3px 3px 0 0'
    //     e.currentTarget.style.zIndex = '2'
    //     console.log(e.currentTarget)
    //     console.log(e.target)
    // };

    // const onMouseLeave = (e) => {
    //     e.currentTarget.children[1].style.display = 'none'
    //     // e.currentTarget.style.transform = 'scale(1)'
    //     e.currentTarget.style.zIndex = '0'
    // };

    return (
        <>
            {/* <ContentDiv onMouseOver={ onMouseOver } onMouseLeave={ onMouseLeave } > */}
                <ContentImg src={ img } alt={ title } />
                {/* <div> */}
                    {/* <p><span>{ age }</span></p> */}
                {/* </div> */}
            {/* </ContentDiv> */}
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