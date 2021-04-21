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
import Store from './dashboard/store/Store';
import Products from './dashboard/store/products/Products';
import GoodReceived from './dashboard/store/good rec and inspection rep/GoodReceived';
import ProductsBinCard from './dashboard/store/productsBinCard/ProductsBinCard';
import Vehicles from './dashboard/store/vehicles/Vehicles';


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
      <Route exact path="/purchasedashboard" component={PurchaseDashboard} />
      <Route exact path="/purchase/material" component={Material} />
      <Route exact path="/purchase/vendors" component={Vendors} />
      <Route exact path="/purchase/supplier_evaluation_form" component={SupplierEvalForm} />
      <Route exact path="/purchase/approved_supplier_list" component={AppSupplier} />
      <Route exact path="/purchase/purchase_order" component={PurchaseOrder} />
      <Route exact path="/purchase/purchase_order_list" component={PurchaseOrderList} />
      <Route exact path="/storedashboard" component={Store} />
      <Route exact path="/storedashboard/products" component={Products} />
      <Route exact path="/storedashboard/good_received_and_inspection_report" component={GoodReceived} />
      <Route exact path="/storedashboard/products_bin_card" component={ProductsBinCard} />
      <Route exact path="/storedashboard/vehicles" component={Vehicles} />
    </BrowserRouter>
  );
}

export default App;
