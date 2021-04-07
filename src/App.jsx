import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './login/Login';
import PurchaseDashboard from './dashboard/purchase/PurchaseDashboard';
import Material from './dashboard/purchase/material/Material';
import Dashboard from './dashboard/Dashboard';





function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/purchasedashboard" component={PurchaseDashboard} />
      <Route exact path="/purchase/material" component={Material} />
    </BrowserRouter>
  );
}

export default App;
