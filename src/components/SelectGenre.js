import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const SelectDiv = styled.select`
    margin-left: 1rem;
`;

function SelectGenre({ selectGenre, genreOptions }) {
    const history = useHistory();

    const handleGenre = (e) => {
        history.push({
            pathname: e.target.value === 'all' ? '/content/genre' : '/content/genre/' + e.target.value
        });
    };
    
    return (
        <>
                <SelectDiv onChange={ handleGenre } value={ selectGenre !== undefined ? selectGenre : 'all' } >
                    <option value="all">전체</option>
                    { genreOptions.map(genre => 
                        <option key={ genre.genreID } value={ genre.genreID }>
                            { genre.genreType }
                        </option>
                    )}
                </SelectDiv>
        </>
    );
}

export default SelectGenre;
