import React from 'react';
import PropTypes from 'prop-types';

function ContentList({ content }) {
    const { img, title } = content;

    // onSelect = 
    return (
        <>
            <div>
                <img src={ img } alt={ title } />
                <h1>{ title }</h1>
            </div>
        </>
    );
}


ContentList.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.string,
    age: PropTypes.string,
    duration: PropTypes.string,
    info: PropTypes.string,
    role: PropTypes.string,
    genreID: PropTypes.number
}

export default ContentList;