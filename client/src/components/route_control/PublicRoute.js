import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, restricted, user, ...rest }) => {
    return (
        <Route { ...rest } render={
            props => (
                user.isLogin && restricted ?
                    <Redirect to="/content" /> :
                    <Component {...props} />
            )
        } />
    );
};

export default PublicRoute;