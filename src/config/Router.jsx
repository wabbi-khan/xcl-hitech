import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import PurchaseDashboard from '../dashboard/purchase/PurchaseDashboard';
import Material from '../dashboard/purchase/material/Material';
import Vendors from '../dashboard/purchase/vendors/Vendors';
import Sidenav from '../dashboard/SideNav/Sidenav';
import Login from '../login/Login';
import SupplierEvalForm from '../dashboard/purchase/supplier eval form/SupplierEvalForm';
import AppSupplier from '../dashboard/purchase/approve supplier list/AppSupplier';
import { PurchaseOrder } from '../dashboard/purchase/purchase order/PurchaseOrder';
import { PurchaseOrderList } from '../dashboard/purchase/purchase order list/PurchaseOrderList';


const Router = () => {
    return (
        <BrowserRouter>
            <Router>
                <Router exact path="/" component={Login}/>
                <Router exact path="/sidenav" component={Sidenav}/>
                <Router exact path="/purchasedashboard" component={PurchaseDashboard}/>
                <Router exact path="/purchase/material" component={Material}/>
                <Router exact path="/purchase/vendors" component={Vendors}/>
                <Router exact path="/purchase/supplier_evaluation_form" component={SupplierEvalForm}/>
                <Router exact path="/purchase/approved_supplier_list" component={AppSupplier}/>
                <Router exact path="/purchase/purchase_order" component={PurchaseOrder}/>
                <Router exact path="/purchase/purchase_order_list" component={PurchaseOrderList}/>
            </Router>
        </BrowserRouter>
    )
}

export default Router
