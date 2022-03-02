import React, { useEffect, useState } from "react";
import axios from "axios";
import ContentListItem from "./ContentListItem";
import SelectGenre from "./SelectGenre";
import styled from "styled-components";
import { contentList } from "../_actions/contentAction";

const ContentList = styled.div`
  color: white;
`;

function ContentGenre({ match }) {
    const [contents, setContents] = useState([]);
    const [genre, setGenre] = useState(match.params.genreID);

    useEffect(() => {
        setGenre(match.params.genreID);
    }, [match]);

    useEffect(() => {
        contentList({ genreID: genre }).then(res => setContents(res));
    }, [genre]);

    return (
        <>
            <SelectGenre selectGenre={genre} />
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
