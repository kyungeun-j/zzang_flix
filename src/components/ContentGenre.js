import React, { useEffect, useState } from "react";
import ContentListItem from "./ContentListItem";
import SelectGenre from "./SelectGenre";
import GenreInfo from "./GenreInfo";
import styled from "styled-components";
import { contentList, genreList } from "../_actions/contentAction";
import TopContent from "./TopContent";

const SelectGenreContainer = styled.section`
    margin: 1rem 4rem 0;
    display: flex;
    align-items: center;
    color: white;
`;
const ContentList = styled.div`
    color: white;
    margin: 3rem 4rem;
    color: white;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
`;

function ContentGenre({ match }) {
    const [contents, setContents] = useState([]);
    const [genreID, setGenreID] = useState(match.params.genreID);
    const [genreType, setGenreType] = useState();
    const [genreOptions, setGenreOptions] = useState([]);
    const [randomContent, setRandomContent] = useState();

    useEffect(() => {
        genreList().then(res => setGenreOptions(res));
    }, []);

    useEffect(() => {
        setGenreID(match.params.genreID);
    }, [match]);
    
    useEffect(() => {
        contentList({ genreID: genreID }).then(res => {
            setContents(res)
            setRandomContent(res[Math.floor(Math.random() * res.length)])
        });
    
        if (genreOptions.length !== 0) {
            if (genreID === undefined) {
                setGenreType();
            } else {
                setGenreType(genreOptions[genreID]['genreType']);
            }
        }
    }, [genreID, genreOptions]);

    return (
        <>
            {
                randomContent !== undefined ?
                <TopContent randomContent={ randomContent } /> : <></>
            }
            <SelectGenreContainer>
                <GenreInfo selectGenreType={ genreType } />
                {
                    genreType === undefined ?
                    <SelectGenre selectGenre={ genreID } genreOptions={ genreOptions } /> : <></>
                }
            </SelectGenreContainer>
            <ContentList>
                {
                    contents.map(content => (
                        <ContentListItem key={content.id} content={content} />
                    ))
                }
            </ContentList>
        </>
    );
}

export default ContentGenre;
