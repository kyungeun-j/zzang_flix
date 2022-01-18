import React from 'react';
import PropTypes from 'prop-types';

function ContentListItem({ content }) {
    const { img, title } = content;

    return (
        <>
            <div>
                <img src={ img } alt={ title } />
                <h1>{ title }</h1>
            </div>
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