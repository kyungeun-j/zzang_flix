import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import ContentListItem from './ContentListItem';
import { useDispatch } from "react-redux";
import { contentList, genreList } from '../_actions/contentAction';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';
import TopContent from "./TopContent";

const ContentList = styled.div`
  color: white;
  margin-top: calc(1152 / 2048 * 77%);
`;
const GenreContainer = styled.div`    
  margin: 3vw 4vw;
  position: relative;
  // overflow: hidden;

  &:hover {
    .slideIcon:nth-child(2) {
      left: -4vw;
      display: ${props => props.genreTypeProps < 0 ? 'block' : 'none'};
    }
  
    .slideIcon:nth-child(3) {
      right: calc(-4vw + 1px);
      display: ${props => props.slideVisibleProps === undefined || props.slideVisibleProps === 1 ? 'block' : 'none'};
    }
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 9px;
  }

  .slideIcon {
    display: none;
    width: 2.5vw;
    height: 10vw;
    position: absolute;
    z-index: 1;
    margin: 0 0.7vw;
  }

  svg:hover {
    cursor: pointer;
    transform: scale(1.5);
  }
`;
const GenreList = styled.div`
  display: flex;
`;

function Content() {
  const [contents, setContents] = useState([]);
  const [genre, setGenre] = useState([]);
  const [moveWidth, setMoveWidth] = useState({});
  const [slideVisible, setSlideVisible] = useState({});
  const [randomContent, setRandomContent] = useState();

  useEffect(() => {
    contentList().then(res => {
      setContents(res)
      setRandomContent(res[Math.floor(Math.random() * res.length)])
    });
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

    if (translateX == 0) {
      setSlideVisible({
        ...slideVisible,
        [genre]: 1
      })
    }
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
    console.log(target)
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
    <>
    {
      randomContent !== undefined ?
      <TopContent randomContent={ randomContent } /> : <></>
    }
    
    <ContentList>
      {
        genre.map(g => (
          <GenreContainer key={ g.genreID } genreTypeProps={moveWidth[g.genreType]} slideVisibleProps={slideVisible[g.genreType]} >
            <h3>{ g.genreType }</h3>
            <MdOutlineArrowBackIos className="slideIcon" onClick={ preSlideHandler } />
            <MdOutlineArrowForwardIos className="slideIcon" onClick={ nextSlideHandler } />

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
    </>
  );
}

export default Content;
