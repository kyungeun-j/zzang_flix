import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Cookies from 'universal-cookie';
import logo from '../static/images/logo.png';
import { logoutUser } from '../_actions/userAction';
import { AiFillCaretDown } from "react-icons/ai";

const Nav = styled.nav`
    position: fixed;
    top: 0;
    width: -webkit-fill-available;
    z-index: 3;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    color: white;

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
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
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

function Navigator({ location, user }) {
    const cookies = new Cookies();
    const history = useHistory();
    const dispatch = useDispatch();
    const [scrollY, setScrollY] = useState(0);

    const onLogout = (e) => {
        e.preventDefault();
        cookies.remove('token')
        dispatch(logoutUser({token: cookies.get('token')}))

        history.push({
        pathname: '/'
        })
    };

    useState(() => {
        window.addEventListener('scroll', () => {
            setScrollY(window.scrollY);
        });
    }, []);
    
    return (
        <Nav style={
            location === '/' ? {padding: '11px 39px'} : 
            location === '/login' ? {padding: '3px 23px', background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0))'} :
            location === '/regform' ? {padding: '2px 20px', borderBottom: '1px solid #e6e6e6' } :
            {padding: '11px 27px', background: scrollY === 0 ? 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0))' : 'black'}
        }>
            <ul className='logo_navBtns'>
                <Link to={ user.isLogin ? '/content' : '/' }>
                    <img src={ logo } alt='logo' style={
                        location === '/' ? {width: '10.5rem'} : 
                        location === '/login' ? {width: '13rem'} :
                        location === '/regform' ? {width: '13.5rem'} :
                        {width: '7.5rem'}
                    } />
                </Link>

                { location.indexOf('/content') >= 0 ?
                    <ul>
                        <Link to={ user.isLogin ? '/content' : '/' }>홈</Link>
                        <Link to='/content/genre'>장르별</Link>
                    </ul>
                    :
                    <></>
                }
            </ul>
            {
                location === '/login' ? <></> :
                <li className='login_outBtn' >
                    {
                    user.isLogin ?
                    <>
                        <UserEmail>
                            {user.userEmail}
                            <AiFillCaretDown className='listIcon' />
                        </UserEmail>
                        <UserBtnList>
                            <li>계정</li>
                            <li onClick={ onLogout }>짱플릭스에서 로그아웃</li>
                        </UserBtnList>
                    </>
                    :
                    <Link to={'/login'}>로그인</Link>
                    }
                </li>
            }
        </Nav>
    )

}

export default Navigator;