import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = (props) => {
        const token = window.localStorage.getItem('token');
        if(token){
            return <>{props.children}</>
        }else{
            return <Navigate to={`/signin`} />
        }
    
}

export default PrivateRoute;