import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import App from './App'
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Forgot from './auth/Forgot';
import Reset from './auth/Reset';
import Activate from './auth/Activate';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Private from './cors/Private';
import Admin from './cors/Admin';


const Routes=()=>{
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/auth/password/forgot" exact component={Forgot} />
                <Route path="/auth/password/reset/:token" exact component={Reset} />
                <Route path="/auth/activate/:token" exact component={Activate} />
                <PrivateRoute path="/private" exact component={Private} />
                <AdminRoute path="/admin" exact component={Admin} />
                <Route path="/" exect component={App} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes