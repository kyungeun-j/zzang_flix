import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import ContentList from "../components/ContentList";
import SelectGenre from "../components/SelectGenre";

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
      {
        genre === 'all' ?
        contents.map(content => (
          <ContentList key={ content.id } content={ content } />
        )) :
        contents.filter(content => (Number(genre) === content.genreID))
        .map(gContent => (
          <ContentList key={ gContent.id } content={ gContent } />
        ))
      }
    </>
  );
}

export default Content;
