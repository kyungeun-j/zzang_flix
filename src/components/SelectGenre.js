import React from "react";

function SelectGenre({ handleGenre }) {
    const genre_options = [
        { value: 'all', name: '전체' },
        { value: '0', name: '애니메이션' },
        { value: '1', name: '판타지' },
        { value: '2', name: '코미디' },
        { value: '3', name: '로맨스' },
        { value: '4', name: '액션' },
        { value: '5', name: '스릴러' }
    ];

    return (
        <select onChange={ handleGenre } value={ genre_options.value } >
            { genre_options.map(genre => 
                <option key={ genre.value } value={ genre.value } defaultValue={ genre.value }>
                    { genre.name }
                </option>
            )}
        </select>
    );
}

export default SelectGenre;
