import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
    console.log(user)
    return (
        <Route {...rest } render={
            props => (
                user.isLogin ?
                    <Component { ...props } />
                    : <Redirect to="/login" />
            )
        } />
    );
};

export default PrivateRoute;