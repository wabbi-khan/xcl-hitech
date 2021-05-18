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
import PurchaseOrder from './dashboard/purchase/purchase order/PurchaseOrder';
import { PurchaseOrderList } from './dashboard/purchase/purchase order list/PurchaseOrderList';
import Store from './dashboard/store/Store';
import Products from './dashboard/store/products/Products';
import GoodReceived from './dashboard/store/good rec and inspection rep/GoodReceived';
import ProductsBinCard from './dashboard/store/productsBinCard/ProductsBinCard';
import Vehicles from './dashboard/store/vehicles/Vehicles';
import VehicleInspectChecklist from './dashboard/store/vehicleInspectCheck/VehicleInspectChecklist';
import DeliveryOrder from './dashboard/store/deliveryOrder/DeliveryOrder';
import DeliveryChalan from './dashboard/store/deliveryChalan/DeliveryChalan';
import DailyInwardReports from './dashboard/store/dailyInwardReports/DailyInwardReports';
import DailyConsumptionReport from './dashboard/store/dailyConsReport/DailyConsumptionReport';
import DeptWiseConsReport from './dashboard/store/deptwiseConsReport/DeptWiseConsReport';
import DeptWiseStoreInventory from './dashboard/store/DeptWiseStoreInv/DeptWiseStoreInventory';
import MaterialIssueReq from './dashboard/store/materialIssueReq/MaterialIssueReq';
import OrderDetails from './dashboard/store/deliveryOrder/OrderDetails';
import PrintPurchaseOrder from './dashboard/purchase/purchase order/PrintPurchaseOrder';
import PurchaseRequisition from './dashboard/purchase/purchaseReq/PurchaseRequisition';
import PurchaseReqPrint from './dashboard/purchase/purchaseReq/PurchaseReqPrint';
import GoodReceivedPrint from './dashboard/store/good rec and inspection rep/GoodReceivedPrint';
import OutwardGatePass from './dashboard/store/outward gate pass/OutwardGatePass';
import StockAssessReport from './dashboard/store/stock assessment report/StockAssessReport';
import OutGatePassPrint from './dashboard/store/outward gate pass/OutGatePassPrint';
import dotenv from 'dotenv'
import HR from './dashboard/hr/HR';
import CompetenceCriteria from './dashboard/hr/competence criteria/CompetenceCriteria';
import Employees from './dashboard/hr/employees/Employees';
import EmpSalaries from './dashboard/hr/employees salary/EmpSalaries';
import EmpLeave from './dashboard/hr/employees leave/EmpLeave';
import EmpAttendance from './dashboard/hr/employees attendence/EmpAttendance';
import EmployeePerformance from './dashboard/hr/employees performance/EmployeePerformance';
import Trainings from './dashboard/hr/trainings/Trainings';
import TrainingNeed from './dashboard/hr/training need/TrainingNeed';
import TrainingPlan from './dashboard/hr/training plan/TrainingPlan';
import TrainingAttendance from './dashboard/hr/training attendance/TrainingAttendance';
import TrainingRecord from './dashboard/hr/training record/TrainingRecord';
import JobDescription from './dashboard/hr/job description/JobDescription';
import EmployeePromotion from './dashboard/hr/employees promotion/EmployeePromotion';
dotenv.config()

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
      <Route exact path="/purchase/purchase_order/print_order" component={PrintPurchaseOrder} />
      <Route exact path="/purchase/purchase_order_list" component={PurchaseOrderList} />
      <Route exact path="/purchase/purchase_requisition" component={PurchaseRequisition} />
      <Route exact path="/purchase/purchase_requisition/print_purchase_requisition" component={PurchaseReqPrint} />
      <Route exact path="/storedashboard" component={Store} />
      <Route exact path="/storedashboard/products" component={Products} />
      <Route exact path="/storedashboard/good_received_and_inspection_report" component={GoodReceived} />
      <Route exact path="/storedashboard/good_received_and_inspection_report/good_rec_inspection_print" component={GoodReceivedPrint} />
      <Route exact path="/storedashboard/products_bin_card" component={ProductsBinCard} />
      <Route exact path="/storedashboard/vehicles" component={Vehicles} />
      <Route exact path="/storedashboard/vehicle_inspect_checklist" component={VehicleInspectChecklist} />
      <Route exact path="/storedashboard/delivery_order" component={DeliveryOrder} />
      <Route exact path="/storedashboard/delivery_chalan" component={DeliveryChalan} />
      <Route exact path="/storedashboard/daily_inwards_report" component={DailyInwardReports} />
      <Route exact path="/storedashboard/daily_consumption_report" component={DailyConsumptionReport} />
      <Route exact path="/storedashboard/department_wise_consumption_report" component={DeptWiseConsReport} />
      <Route exact path="/storedashboard/department_wise_store_inventory" component={DeptWiseStoreInventory} />
      <Route exact path="/storedashboard/material_issue_requisition" component={MaterialIssueReq} />
      <Route exact path="/storedashboard/delivery_order/order_details" component={OrderDetails} />
      <Route exact path="/storedashboard/outward_gatepass" component={OutwardGatePass} />
      <Route exact path="/storedashboard/outward_gatepass/print_outward_gatepass" component={OutGatePassPrint} />
      <Route exact path="/storedashboard/stock_assessment_report" component={StockAssessReport} />
      <Route exact path="/hr_dashboard" component={HR} />
      <Route exact path="/hr/competence_criteria" component={CompetenceCriteria} />
      <Route exact path="/hr/employees" component={Employees} />
      <Route exact path="/hr/employees_salaries" component={EmpSalaries} />
      <Route exact path="/hr/employees_leave" component={EmpLeave} />
      <Route exact path="/hr/employees_attendance" component={EmpAttendance} />
      <Route exact path="/hr/employees_performance_assessment" component={EmployeePerformance} />
      <Route exact path="/hr/trainings" component={Trainings} />
      <Route exact path="/hr/training_need_identification" component={TrainingNeed} />
      <Route exact path="/hr/training_plan" component={TrainingPlan} />
      <Route exact path="/hr/training_attendance" component={TrainingAttendance} />
      <Route exact path="/hr/training_record" component={TrainingRecord} />
      <Route exact path="/hr/job_description" component={JobDescription} />
      <Route exact path="/hr/employees_promotion" component={EmployeePromotion} />
    </BrowserRouter>
  );
}

export default App;
