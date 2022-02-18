import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ContentListItem from './ContentListItem';
import { useDispatch } from "react-redux";
import { contentList, genreList } from '../_actions/contentAction';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';

const ContentList = styled.div`
  color: white;
`;
const GenreContainer = styled.div`
  margin: 2rem 3rem;
  overflow: hidden
`;
const GenreList = styled.div`
  display: flex;
  position: relative;

  .slideIcon {
    transform: scale(2.5);
    position: absolute;
    top: 50%;
    right: 16px;
  }

  .slideIcon:nth-child(1) {
      left: 16px;
  }

  .slideIcon:hover {
    transform: scale(3.5);
  }

  &::hover {

  }
`;

function Content() {
  const [contents, setContents] = useState([]);
  const [genre, setGenre] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    contentList().then(res => setContents(res));
    genreList().then(res => setGenre(res));
  }, []);

  const slideHandler = (e) => {
    const GenreListWidth = 14 * 15 * (e.target.parentElement.children.length-2); // slide 전체 길이
    const visibleCount = Math.floor((window.innerWidth - 42) / (15*14)); // 보여지고있는 content 개수 (내림)
    
    const moveWidth = 14 * 15 * visibleCount * -1;
    e.target.parentElement.style.transform = 'translateX('+moveWidth+'px)';

    // console.log(window.innerWidth) // 화면 길이
    console.log(GenreListWidth)
    console.log(GenreListWidth - window.innerWidth) // 남은길이
    console.log(window.innerWidth - 42)
    // console.log((window.innerWidth - 42) / (15*14)) //보여지고있는 개수

  }

  return (
    <ContentList>
      {
        genre.map(g => (
          <GenreContainer>
            <h3>{ g.genreType }</h3>
            <GenreList>
            <MdOutlineArrowBackIos className="slideIcon" onClick={ slideHandler } />
            {
              contents.filter(c => c.genreID === g.genreID).map(cg => (
                <ContentListItem key={cg.id} content={cg} />
              ))
            }
            <MdOutlineArrowForwardIos className="slideIcon" onClick={ slideHandler } />
            </GenreList>
          </GenreContainer>
        ))
      }
    </ContentList>
  );
}

export default Content;
