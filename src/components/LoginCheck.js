import React, { useEffect } from 'react'
import Cookies from 'universal-cookie';

function LoginCheck({ component: Component, path, ...rest }) {

    const cookies = new Cookies();
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        setIsLogin(cookies.get('token') !== undefined ? true : false)
    }, [isLogin])

    return (
        <Route
            {...rest}

            render={props => {

                // 현재 role과 컴포넌트가 일치하지 않으면 403출력
                if (isLogin === false) {
                    return <Forbidden />;
                }

                // 권한에 맞는 컴포넌트 출력
                if (Component) {
                    return <Component {...props} role={role} />;
                }

                return null;
            }}
        />
    );
}

export default LoginCheck;