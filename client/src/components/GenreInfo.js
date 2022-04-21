import React from "react";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";

function GenreInfo({ selectGenreType }) {
    return (
        <>
            <Link to='/content/genre'
                style={selectGenreType === undefined ? 
                { textDecoration: 'none', color: 'white', fontSize: 'x-large', fontWeight: '700' } : { textDecoration: 'none', color: '#808080', fontSize: '17px', fontWeight: '400' }}>
            장르
            </Link>
                {
                    selectGenreType === undefined ? <></> :
                    <>
                        <BiChevronRight style={{ color: '#808080', fontSize: '17px', fontWeight: '400' }} />
                        <ul style={{ listStyle: 'none' }}>
                            <li style={{ fontSize: 'x-large', fontWeight: '700' }}>
                                { selectGenreType }
                            </li>
                        </ul>
                    </>
                }
        </>
    );
}

export default GenreInfo;
