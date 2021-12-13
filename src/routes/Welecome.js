import React from 'react'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

function Welecome() {
    const location = useLocation();

    return(
        <>
        <div>welecome</div>
        { location.state.name } 님 환영합니다.

        <Link to='/login'>
            <button>
                Login
            </button>
        </Link>
        </>
    );
}

export default Welecome;