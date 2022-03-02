import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContentImg = styled.img`
    width: 16rem;
    margin-right: 6px;
    border-radius: 3px;
`;

function ContentListItem({ content }) {
    const { img, title } = content;

    return (
        <>
            <ContentImg src={ img } alt={ title } />
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