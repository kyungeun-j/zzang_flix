import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Cookies from 'universal-cookie';
import logo from '../static/images/logo.png';
import { logoutUser } from '../_actions/userAction';
import { genreList } from "../_actions/contentAction";
import { AiFillCaretDown } from "react-icons/ai";
import SelectGenre from "./SelectGenre";
import GenreInfo from "./GenreInfo";

const Nav = styled.nav`
    position: fixed;
    top: 0;
    width: -webkit-fill-available;
    z-index: 3;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    color: white;

    div {
        flex: 1 1 40%;
    }
    & a {
        color: white;
        text-decoration: none;
    }
    .logo_navBtns {
        display: flex;
        align-items: center;
    }
    .logo_navBtns ul {
        width: 115px;
        list-style: none;
        display: flex;
        justify-content: space-around;
        font-size: 14px;
    }
    .login_outBtn {
        position: relative;
        margin-right: 13px;
        cursor: pointer;
        display: flex;
        justify-content: flex-end;
    }
    .login_outBtn div {
        justify-content: flex-end;
    }
    .login_outBtn a, button {
        padding: 9px 17px;
        margin-right: 18px;
        border-radius: 4px;
        background-color: #e50914;
        text-decoration: none;
        color: white;
        margin: 0;
        border: 0;

        ${(props) =>
            props.location == '/regform' &&
            css`
                background-color: transparent;
                color: black;
                font-weight: bold;
                font-size: 20px;
            `
        }
    }
    .login_outBtn:hover {
        .listIcon {
            animation: login_outIcon .3s forwards;
        }
    }
    @keyframes login_outIcon {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(180deg);
        }
    }
`;
const UserEmail = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
`;
const UserBtnList = styled.ul`
    list-style: none;
    display: none;
    position: absolute;
    top: 44px;
    right: -1px;
    color: white;
    background-color: #000000bf;
    border: 1px solid #808080a8;
    padding: 5px 10px;

    &::after {
        content: '';
        position: absolute;
        top: -78%;
        right: 10%;
        width: 0;
        height: 26px;
        border: 0.55em solid transparent;
        border-bottom-color: var(--back-color);
        border-top: 0;
        margin: 0 7px;
        color: #ffffffcf;
    }
    ${ Nav } .login_outBtn:hover & {
        display: block;
    }
    & li {
        cursor: pointer;
    }
`;
const SubNav = styled.div`
    margin-left: 1rem;
    display: flex;
    align-items: center;
    color: white;
`;

function Navigator({ location, user }) {
    const cookies = new Cookies();
    const history = useHistory();
    const dispatch = useDispatch();
    const [scrollY, setScrollY] = useState(0);

    // for content genre select
    const [genreID, setGenreID] = useState();
    const [genreType, setGenreType] = useState();
    const genreOptions = useSelector(state => state.content.genre);

    useState(() => {
        window.addEventListener('scroll', () => {
            setScrollY(window.scrollY);
        });
    }, []);

    const onLogout = (e) => {
        e.preventDefault();
        cookies.remove('token')
        dispatch(logoutUser({token: cookies.get('token')}))

        history.push({
        pathname: '/'
        })
    };

    useEffect(() => {
        dispatch(genreList())
    }, []);

    useEffect(() => {
        if (location.indexOf('/content/genre') >= 0) 
        {
            if (!isNaN(location.slice(-1)) && genreOptions.length !== 0) 
            {
                setGenreID(location.slice(-1));
                setGenreType(genreOptions[location.slice(-1)]['genreType']);
            } 
            else 
            {
                setGenreID(undefined);
                setGenreType();
            }
        }
    }, [location, genreOptions]);
    
    return (
        <Nav style={
            location === '/' ? {padding: '22px 51px'} : 
            location === '/login' ? {padding: '18px 40px', background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0))'} :
            location === '/regform'  ? {padding: '19px 39px', borderBottom: '1px solid #e6e6e6' } :
            location === '/account' || location === '/password' ? {padding: '12px 40px', background: 'black' } :
            {padding: '18px 54px', background: scrollY === 0 ? 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0))' : 'black'}
        }>
            <div className='logo_navBtns'>
                <Link to={ user.isLogin ? '/content' : '/' }>
                    <img src={ logo } alt='logo' style={
                        location === '/' || location === '/account' || location === '/password' ? {width: '11.5rem'} : 
                        location === '/login' ? {width: '15rem'} :
                        location === '/regform' ? {width: '14.5rem'} :
                        {width: '8.8rem'}
                    } />
                </Link>
                { 
                    location.indexOf('/content') >= 0 &&
                    <ul>
                        <Link to={ user.isLogin ? '/content' : '/' }>???</Link>
                        <Link to='/content/genre'>?????????</Link>
                    </ul>
                }
            </div>
            {
                location !== '/login' && 
                <div className='login_outBtn' >
                    {
                    user.isLogin ?
                    <>
                        <UserEmail>
                            { user.userEmail }
                            <AiFillCaretDown className='listIcon' />
                        </UserEmail>
                        <UserBtnList>
                            <li onClick={ () => history.push({ pathname: '/account' }) }>??????</li>
                            <li onClick={ onLogout }>?????????????????? ????????????</li>
                        </UserBtnList>
                    </>
                    :
                    <Link to='/login'>?????????</Link>
                    }
                </div>
            }
            {
                location.indexOf('/content/genre') >= 0 &&
                <SubNav>
                    <GenreInfo selectGenreType={ genreType } />
                    {
                        genreType === undefined ?
                        <SelectGenre selectGenre={ genreID } genreOptions={ genreOptions } /> : <></>
                    }
                </SubNav>
            }
        </Nav>
    );
}

export default Navigator;