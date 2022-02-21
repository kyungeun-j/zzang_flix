import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import ContentListItem from './ContentListItem';
import { useDispatch } from "react-redux";
import { contentList, genreList } from '../_actions/contentAction';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';

const ContentList = styled.div`
  color: white;
`;
const GenreContainer = styled.div`    
  margin: 3rem 4rem;
  overflow: hidden;
  position: relative;

  &:hover {
    .slideIcon {
      display: none;
    }
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 9px;
  }

  .slideIcon {
    display: none;
    transform: scale(2.5);
    position: absolute;
    top: 50%;
    z-index: 1;
  }

  .slideIcon:nth-child(2) {
      left: 16px;
  }

  .slideIcon:nth-child(3) {
    right: 16px;
  }

  svg:hover {
    cursor: pointer;
    transform: scale(3.5);
  }
`;
const GenreList = styled.div`
  display: flex;

  &::hover {

  }
`;

function Content() {
  const [contents, setContents] = useState([]);
  const [genre, setGenre] = useState([]);
  const [moveWidth, setMoveWidth] = useState({});
  const [slideVisible, setSlideVisible] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    contentList().then(res => setContents(res));
    genreList().then(res => setGenre(res));
  }, []);

  const preSlideHandler = (e) => {
    const genre = e.target.tagName === 'path' ?
                    e.currentTarget.parentElement.children[0].innerText : e.target.parentElement.children[0].innerText;
    const target = e.target.tagName === 'path' ?
                    e.currentTarget.parentElement.children[3] : e.target.parentElement.children[3]; // GenreListEle
    
    const nowImgCount = Math.floor(target.offsetWidth / (target.children[0].offsetWidth + 6));
    const preWidth = nowImgCount * (target.children[0].offsetWidth + 6);
    const translateX = moveWidth[genre] + preWidth;

    target.style.transform = 'translateX('+translateX+'px)';
    setMoveWidth({
      ...moveWidth,
      [genre]: translateX
    });
  }

  const nextSlideHandler = (e) => {
    const genre = e.target.tagName === 'path' ?
                    e.currentTarget.parentElement.children[0].innerText : e.target.parentElement.children[0].innerText;

    // gnere별 state 추가를 위함
    setMoveWidth({
      ...moveWidth,
      [genre]: 0
    });

    setSlideVisible({
      ...slideVisible,
      [genre]: 1
    })

    const target = e.target.tagName === 'path' ?
                    e.currentTarget.parentElement.children[3] : e.target.parentElement.children[3]; // GenreListEle
    const nowImgCount = Math.floor(target.offsetWidth / (target.children[0].offsetWidth + 6));
    const translateX = moveWidth[genre] !== undefined ? moveWidth[genre] + (nowImgCount * (target.children[0].offsetWidth + 6) * -1) : nowImgCount * (target.children[0].offsetWidth + 6) * -1;
    
    target.style.transform = 'translateX('+translateX+'px)';
    setMoveWidth({
      ...moveWidth,
      [genre]: translateX
    });

    if ((((target.children[0].offsetWidth + 6)*6) + translateX) <= (target.children[0].offsetWidth + 6) * nowImgCount ) {
      setSlideVisible({
        ...slideVisible,
        [genre]: 0
      })
    }
  }

  return (
    <ContentList>
      {
        genre.map(g => (
          <GenreContainer key={ g.genreID }>
            <h3>{ g.genreType }</h3>
            <MdOutlineArrowBackIos className="slideIcon" 
              style={{ display : moveWidth[g.genreType] < 0 ? 'block' : 'none'}}
              onClick={ preSlideHandler } />
            <MdOutlineArrowForwardIos className="slideIcon" 
              style={{ display: slideVisible[g.genreType] === undefined || slideVisible[g.genreType] === 1 ? 'block' : 'none' }} 
              onClick={ nextSlideHandler } />
            <GenreList>
            {
              contents.filter(c => c.genreID === g.genreID).map(cg => (
                <ContentListItem key={ cg.id } content={ cg } />
              ))
            }
            </GenreList>
          </GenreContainer>
        ))
      }
    </ContentList>
  );
}

export default Content;
