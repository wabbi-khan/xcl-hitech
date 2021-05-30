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
import OutGatePassPrint from '../dashboard/store/outward gate pass/OutGatePassPrint';
import HR from '../dashboard/hr/HR';
import Designation from '../dashboard/hr/designation/Designation';
import Education from '../dashboard/hr/education/Education';
import Skills from '../dashboard/hr/skills/Skills';
import Experience from '../dashboard/hr/experience/Experience';
import CompetenceCriteria from '../dashboard/hr/competence criteria/CompetenceCriteria';
import Employees from '../dashboard/hr/employees/Employees';
import EmpSalaries from '../dashboard/hr/employees salary/EmpSalaries';
import EmpLeave from '../dashboard/hr/employees leave/EmpLeave';
import EmpAttendance from '../dashboard/hr/employees attendence/EmpAttendance';
import EmployeePerformance from '../dashboard/hr/employees performance/EmployeePerformance';
import Trainings from '../dashboard/hr/trainings/Trainings';
import TrainingNeed from '../dashboard/hr/training need/TrainingNeed';
import TrainingPlan from '../dashboard/hr/training plan/TrainingPlan';
import TrainingAttendance from '../dashboard/hr/training attendance/TrainingAttendance';
import TrainingRecord from '../dashboard/hr/training record/TrainingRecord';
import JobDescription from '../dashboard/hr/job description/JobDescription';
import EmployeePromotion from '../dashboard/hr/employees promotion/EmployeePromotion';
import CompetenceCriteriaPrint from '../dashboard/hr/competence criteria/CompetenceCriteriaPrint';
import FullOrderDetails from '../dashboard/purchase/purchase order list/FullOrderDetails';
import ViewEmpDetails from '../dashboard/hr/employees/ViewEmpDetails';
import AddEmpAttendance from '../dashboard/hr/emp attendance new/AddEmpAttendance';
import Category from '../dashboard/purchase/category/Category';
import InspectionForm from '../dashboard/store/good rec and inspection rep/InspectionForm';



const Router = () => {
    return (
        <BrowserRouter>
            <Router>
                <Router exact path="/" component={Login}/>
                <Router exact path="/sidenav" component={Sidenav}/>
                <Router exact path="/purchasedashboard" component={PurchaseDashboard}/>
                <Router exact path="/purchase/category" component={Category}/>
                <Router exact path="/purchase/material" component={Material}/>
                <Router exact path="/purchase/vendors" component={Vendors}/>
                <Router exact path="/purchase/supplier_evaluation_form" component={SupplierEvalForm}/>
                <Router exact path="/purchase/approved_supplier_list" component={AppSupplier}/>
                <Router exact path="/purchase/purchase_order" component={PurchaseOrder}/>
                <Router exact path="/purchase/purchase_order/print_order" component={PrintPurchaseOrder}/>
                <Router exact path="/purchase/purchase_order_list" component={PurchaseOrderList}/>
                <Router exact path="/purchase/purchase_order_list/order_details/:id" component={FullOrderDetails}/>
                <Router exact path="/purchase/purchase_requisition" component={PurchaseRequisition}/>
                <Router exact path="/purchase/purchase_requisition/print_purchase_requisition" component={PurchaseReqPrint}/>
                <Router exact path="/storedashboard" component={Store}/>
                <Router exact path="/storedashboard/products" component={Products}/>
                <Router exact path="/storedashboard/good_received_and_inspection_form" component={InspectionForm}/>
                <Router exact path="/storedashboard/good_received_and_inspection_report/:id" component={GoodReceived}/>
                <Router exact path="/storedashboard/good_received_and_inspection_report/good_rec_inspection_print/:id" component={GoodReceivedPrint}/>
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
                <Router exact path="/storedashboard/outward_gatepass/print_outward_gatepass" component={OutGatePassPrint}/>
                <Router exact path="/storedashboard/stock_assessment_report" component={StockAssessReport}/>
                <Router exact path="/hr_dashboard" component={HR}/>
                <Router exact path="/hr/designation" component={Designation}/>
                <Router exact path="/hr/education" component={Education}/>
                <Router exact path="/hr/skills" component={Skills}/>
                <Router exact path="/hr/experience" component={Experience}/>
                <Router exact path="/hr/training" component={Training}/>
                <Router exact path="/hr/competence_criteria" component={CompetenceCriteria}/>
                <Router exact path="/hr/competence_criteria_print" component={CompetenceCriteriaPrint}/>
                <Router exact path="/hr/employees" component={Employees}/>
                <Router exact path="/hr/employees/view_emp_details" component={ViewEmpDetails}/>
                <Router exact path="/hr/employees_salaries" component={EmpSalaries}/>
                <Router exact path="/hr/employees_leave" component={EmpLeave}/>
                <Router exact path="/hr/employees_attendance" component={EmpAttendance}/>
                <Router exact path="/hr/employees_attendance/add_new_attendance" component={AddEmpAttendance}/>
                <Router exact path="/hr/employees_performance_assessment" component={EmployeePerformance}/>
                <Router exact path="/hr/trainings" component={Trainings}/>
                <Router exact path="/hr/training_need_identification" component={TrainingNeed}/>
                <Router exact path="/hr/training_plan" component={TrainingPlan}/>
                <Router exact path="/hr/training_attendance" component={TrainingAttendance}/>
                <Router exact path="/hr/training_record" component={TrainingRecord}/>
                <Router exact path="/hr/job_description" component={JobDescription}/>
                <Router exact path="/hr/employees_promotion" component={EmployeePromotion}/>
            </Router>
        </BrowserRouter>
    )
}

export default Router
