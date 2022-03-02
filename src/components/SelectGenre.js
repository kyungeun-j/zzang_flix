import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { genreList } from "../_actions/contentAction";


function SelectGenre({ selectGenre }) {
    const history = useHistory();
    const [genreOptions, setGenreOptions] = useState([]);

    useEffect(() => {
        genreList().then(res => setGenreOptions(res));
    }, []);

    const handleGenre = (e) => {
        history.push({
            pathname: e.target.value === 'all' ? '/content/genre' : '/content/genre/' + e.target.value
        });
    };
    
    return (
        <select onChange={ handleGenre } value={ selectGenre !== undefined ? selectGenre : 'all' } >
            <option value="all">전체</option>
            { genreOptions.map(genre => 
                <option key={ genre.genreID } value={ genre.genreID }>
                    { genre.genreType }
                </option>
            )}
        </select>
    );
}

export default SelectGenre;
