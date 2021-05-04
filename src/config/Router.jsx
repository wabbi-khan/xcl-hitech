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
import Store from '../dashboard/store/Store';
import Products from '../dashboard/store/products/Products';
import GoodReceived from '../dashboard/store/good rec and inspection rep/GoodReceived';
import ProductsBinCard from '../dashboard/store/productsBinCard/ProductsBinCard';
import Vehicles from '../dashboard/store/vehicles/Vehicles';
import VehicleInspectChecklist from '../dashboard/store/vehicleInspectCheck/VehicleInspectChecklist';
import DeliveryOrder from '../dashboard/store/deliveryOrder/DeliveryOrder';
import DeliveryChalan from '../dashboard/store/deliveryChalan/DeliveryChalan';
import DailyInwardReports from '../dashboard/store/dailyInwardReports/DailyInwardReports';
import DailyConsumptionReport from '../dashboard/store/dailyConsReport/DailyConsumptionReport';
import DeptWiseConsReport from '../dashboard/store/deptwiseConsReport/DeptWiseConsReport';
import DeptWiseStoreInventory from '../dashboard/store/DeptWiseStoreInv/DeptWiseStoreInventory';
import MaterialIssueReq from '../dashboard/store/materialIssueReq/MaterialIssueReq';
import OrderDetails from '../dashboard/store/deliveryOrder/OrderDetails';
import PrintPurchaseOrder from '../dashboard/purchase/purchase order/PrintPurchaseOrder';
import PurchaseRequisition from '../dashboard/purchase/purchaseReq/PurchaseRequisition';
import PurchaseReqPrint from '../dashboard/purchase/purchaseReq/PurchaseReqPrint';
import GoodReceivedPrint from '../dashboard/store/good rec and inspection rep/GoodReceivedPrint';
import OutwardGatePass from '../dashboard/store/outward gate pass/OutwardGatePass';
import StockAssessReport from '../dashboard/store/stock assessment report/StockAssessReport';



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
                <Router exact path="/purchase/purchase_order/print_order" component={PrintPurchaseOrder}/>
                <Router exact path="/purchase/purchase_order_list" component={PurchaseOrderList}/>
                <Router exact path="/purchase/purchase_requisition" component={PurchaseRequisition}/>
                <Router exact path="/purchase/purchase_requisition/print_purchase_requisition" component={PurchaseReqPrint}/>
                <Router exact path="/storedashboard" component={Store}/>
                <Router exact path="/storedashboard/products" component={Products}/>
                <Router exact path="/storedashboard/good_received_and_inspection_report" component={GoodReceived}/>
                <Router exact path="/storedashboard/good_received_and_inspection_report/good_rec_inspection_print" component={GoodReceivedPrint}/>
                <Router exact path="/storedashboard/products_bin_card" component={ProductsBinCard}/>
                <Router exact path="/storedashboard/vehicles" component={Vehicles}/>
                <Router exact path="/storedashboard/vehicle_inspect_checklist" component={VehicleInspectChecklist}/>
                <Router exact path="/storedashboard/delivery_order" component={DeliveryOrder}/>
                <Router exact path="/storedashboard/delivery_chalan" component={DeliveryChalan}/>
                <Router exact path="/storedashboard/daily_inwards_report" component={DailyInwardReports}/>
                <Router exact path="/storedashboard/daily_consumption_report" component={DailyConsumptionReport}/>
                <Router exact path="/storedashboard/department_wise_consumption_report" component={DeptWiseConsReport}/>
                <Router exact path="/storedashboard/department_wise_store_inventory" component={DeptWiseStoreInventory}/>
                <Router exact path="/storedashboard/material_issue_requisition" component={MaterialIssueReq}/>
                <Router exact path="/storedashboard/delivery_order/order_details" component={OrderDetails}/>
                <Router exact path="/storedashboard/outward_gatepass" component={OutwardGatePass}/>
                <Router exact path="/storedashboard/stock_assessment_report" component={StockAssessReport}/>
            </Router>
        </BrowserRouter>
    )
}

export default Router
