import React from 'react';
import api from '../utils/api.js';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => {
        var path = props.location.pathname;
        if(api.isAuth()===false){
            return(<Redirect to='/' />)
        }
        else{
            return( <Component {...props} /> )
        }
    }} />
)