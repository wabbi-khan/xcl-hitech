import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


const Router = () => {
    return (
        <BrowserRouter>
            <Router>
                <Router exact path="/" />
            </Router>
        </BrowserRouter>
    )
}

export default Router
