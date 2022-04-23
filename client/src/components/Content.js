import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ContentListItem from './ContentListItem';
import { contentList, genreList } from '../_actions/contentAction';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';
import TopContent from "./TopContent";
import ContentDetailModal from "./ContentDetailModal";
import { useDispatch, useSelector } from "react-redux";

const ContentList = styled.div`
  color: white;
  padding-top: calc(1152 / 2048 * 77%);
  overflow: hidden;
`;
const GenreContainer = styled.div`
  &:hover {
    .slideIcon:nth-child(2) {
      left: 0;
      display: ${props => props.genreTypeProps < 0 ? 'block' : 'none'};
    }
    .slideIcon:nth-child(3) {
      right: 0;
      display: ${props => props.slideVisibleProps === undefined || props.slideVisibleProps === 1 ? 'block' : 'none'};
    }
  }
  .slideIcon {
    display: none;
    padding: 0 0.5vw;
    width: 3vw;
    height: ${props => props.imgWidth / 126 * 71}px;
    position: absolute;
    z-index: 10;
    background: #0000003d;
  }
  .slideIcon:hover {
    cursor: pointer;
    transform: scale(1.1);
    z-index: 10;
    background: #00000094;
  }
  h3 {
    font-size: 1.3rem;
    margin-left: 4vw;
  }
`;
const GenreContentContainer = styled.div`    
  margin: 0 4vw 3vw;
  position: relative;
`;
const GenreList = styled.div`
  display: flex;
  width: calc(100vw - 8.8vw);
`;
const ContentList2 = styled.div`
    color: white;
    margin: calc(1152 / 2048 * 80%) 3.5vw 3vw;
    color: white;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
`;

function Content({ match }) {
const dispatch = useDispatch();
  
  const content = useSelector(state => state.content);
  console.log(content)
  // console.log(genre)
  const [genreID, setGenreID] = useState(match.params.genreID);
  const [moveWidth, setMoveWidth] = useState({});
  const [slideVisible, setSlideVisible] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [imgWidth, setImgWidth] = useState(Math.floor((window.innerWidth - window.innerWidth * 0.1) / Math.round((window.innerWidth - window.innerWidth * 0.08) / 225)))
  const [imgCount, setImgCount] = useState(Math.round((window.innerWidth - window.innerWidth * 0.08) / 225));

  // modal
  const modalHandler = (openVal, content) => {
    setModalVisible(openVal);
    setModalContent(content);
  };

  // width resize 
  const resizeHandler = () => {
    window.innerWidth > 900 ?
    setImgWidth(Math.floor((window.innerWidth - window.innerWidth * 0.1) / Math.round((window.innerWidth - window.innerWidth * 0.08) / 225))) :
    setImgWidth(Math.floor((window.innerWidth - window.innerWidth * 0.1) / Math.round((window.innerWidth - window.innerWidth * 0.08) / 155)));
    
    window.innerWidth > 900 ?
    setImgCount(Math.round((window.innerWidth - window.innerWidth * 0.08) / 225)):
    setImgCount(Math.round((window.innerWidth - window.innerWidth * 0.08) / 155));
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
      return () => { window.removeEventListener('resize', resizeHandler) };
  }, []);

  // genre select
  useEffect(() => {
    setGenreID(match.params.genreID);
  }, [match]);

  useEffect(() => {
    dispatch(contentList({ genreID: match.params.genreID }));
  }, [genreID]);
  
  useEffect(() => {
    Object.values(content['genre']).map(gItem => {
      slideVisible[gItem['genreType']] = imgCount >= 6 ? 0 : 1
    })
  }, [imgCount, content['genre']]);

  const preSlideHandler = (e) => {
    const genre = e.target.tagName === 'path' ?
                    e.currentTarget.parentElement.children[0].innerText : e.target.parentElement.children[0].innerText;
    const target = e.target.tagName === 'path' ?
                    e.currentTarget.parentElement.children[3].children[0] : e.target.parentElement.children[3].children[0];
    const nowImgCount = Math.floor((window.innerWidth - (3 * window.innerWidth / 100)) / (target.children[0].offsetWidth + 6));
    const preWidth = nowImgCount * (target.children[0].offsetWidth + 6);
    const translateX = moveWidth[genre] + preWidth > 0 ? 0 : moveWidth[genre] + preWidth;
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
  };

  const nextSlideHandler = (e) => {
    const genre = e.target.tagName === 'path' ?
                    e.currentTarget.parentElement.children[0].innerText : e.target.parentElement.children[0].innerText;

    // gnere별 state 추가를 위함
    setMoveWidth({
      ...moveWidth,
      [genre]: 0
    });

    const target = e.target.tagName === 'path' ?
                    e.currentTarget.parentElement.children[3].children[0] : e.target.parentElement.children[3].children[0]; // GenreListEle
    const nowImgCount = Math.floor((window.innerWidth - (3 * window.innerWidth / 100)) / (target.children[0].offsetWidth + 6));
    const translateX = moveWidth[genre] !== undefined ? moveWidth[genre] + (nowImgCount * (target.children[0].offsetWidth + 6) * -1) : nowImgCount * (target.children[0].offsetWidth + 6) * -1;
    target.style.transform = 'translateX('+translateX+'px)';

    setMoveWidth({
      ...moveWidth,
      [genre]: translateX
    });
    
      setSlideVisible({
        ...slideVisible,
        [genre]: (6 - nowImgCount < nowImgCount) ? 0 : 1
      }); 
  };
  
  return (
    <>
    {
      // detail modal
      modalVisible && <ContentDetailModal modalVisible={ modalVisible } modalHandler={ modalHandler } content={ modalContent } />
    }
    {
      // top content
      content['randomContent'] !== undefined ? <TopContent randomContent={ content['randomContent'] } modalHandler={ modalHandler }  /> : <></>
    }
    {
      // content items
      Object.values(match.params).length === 0 ?
      // 기본
      <ContentList>
        {
          content['genre'].map(g => (
            <GenreContainer key={ g.genreID } genreTypeProps={ moveWidth[g.genreType] } slideVisibleProps={ slideVisible[g.genreType] } imgWidth={imgWidth}>
              <h3>{ g.genreType }</h3>
              {/* content pre/next btn */}
              <MdOutlineArrowBackIos className="slideIcon" onClick={ preSlideHandler } />
              <MdOutlineArrowForwardIos className="slideIcon" onClick={ nextSlideHandler } />
              <GenreContentContainer >
                <GenreList>
                {
                  content['content'].filter(c => c.genreID === g.genreID).map(cg => (
                    <ContentListItem key={ cg.id } content={ cg } moveWidth={ moveWidth[content['genre'][cg.genreID]['genreType']] } modalHandler={ modalHandler } imgWidth={ imgWidth } />
                  ))
                }
                </GenreList>
              </GenreContentContainer>
            </GenreContainer>
          ))
        }
      </ContentList> :
      // 장르별
      <ContentList2>
      {
        content['content'].map(content => (
            <ContentListItem key={ content.id } content={ content } modalHandler={ modalHandler } imgWidth={ imgWidth } />
        ))
      }
      </ContentList2>
    }
    </>
  );
}

export default Content;
