import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Sidenav from '../dashboard/SideNav/Sidenav';
import Login from '../login/Login';


const Router = () => {
    return (
        <BrowserRouter>
            <Router>
                <Router exact path="/" component={Login}/>
                <Router exact path="/sidenav" component={Sidenav}/>
            </Router>
        </BrowserRouter>
    )
}

export default Router
