import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import ContentListItem from "./ContentListItem";
import SelectGenre from "../components/SelectGenre";
import styled from "styled-components";

const ContentList = styled.div`
  color: white;
`;

function Content() {
  const [contents, setContents] = useState([]);
  const [genre, setGenre] = useState('all');

  const getContent = async() => {
    await axios.get('/api/content')
          .then((res) => setContents(res.data.content));
  };

  useEffect(() => {
    getContent();
  }, []);

  const handleGenre = (e) => {
      setGenre(e.target.value)
  };

  return (
    <>
      <SelectGenre handleGenre={ handleGenre } genre={ genre } />
      <ContentList>
        {
          genre === 'all' ?
          contents.map(content => (
            <ContentListItem key={ content.id } content={ content } />
          ))
          :
          contents.filter(content => (Number(genre) === content.genreID))
          .map(gContent => (
            <ContentListItem key={ gContent.id } content={ gContent } />
          ))
        }
      </ContentList>
    </>
  );
}

export default Content;
