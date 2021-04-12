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
import Vendors from './dashboard/purchase/vendors/Vendors';
import { createMuiTheme } from '@material-ui/core/styles';
import SupplierEvalForm from './dashboard/purchase/supplier eval form/SupplierEvalForm';
import AppSupplier from './dashboard/purchase/approve supplier list/AppSupplier';
import { PurchaseOrder } from './dashboard/purchase/purchase order/PurchaseOrder';
import { PurchaseOrderList } from './dashboard/purchase/purchase order list/PurchaseOrderList';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#22a19a',
      secondary: '#00726c',
      contrastText: '#fff',
    }
  },
});

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/purchasedashboard" component={PurchaseDashboard} />
      <Route exact path="/purchase/material" component={Material} />
      <Route exact path="/purchase/vendors" component={Vendors} />
      <Route exact path="/purchase/supplier_evaluation_form" component={SupplierEvalForm} />
      <Route exact path="/purchase/approved_supplier_list" component={AppSupplier} />
      <Route exact path="/purchase/purchase_order" component={PurchaseOrder} />
      <Route exact path="/purchase/purchase_order_list" component={PurchaseOrderList} />
    </BrowserRouter>
  );
}

export default App;
