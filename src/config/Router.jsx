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
import DeliveryChalan from '../dashboard/store/deliveryChalan/DeliveryChalan';
import DailyConsumptionReport from '../dashboard/store/dailyConsReport/DailyConsumptionReport';
import DeptWiseConsReport from '../dashboard/store/deptwiseConsReport/DeptWiseConsReport';
import DeptWiseStoreInventory from '../dashboard/store/DeptWiseStoreInv/DeptWiseStoreInventory';
import MaterialIssueReq from '../dashboard/store/materialIssueReq/MaterialIssueReq';
import OrderDetails from '../dashboard/marketing-sales/deliveryOrder/OrderDetails';
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
import Department from '../dashboard/purchase/department/Department';
import MaterialReqDetails from '../dashboard/store/materialIssueReq/MaterialReqDetails';
import CompleteMaterialReq from '../dashboard/store/materialIssueReq/CompleteMaterialReq';
import CompleteMatReqDetails from '../dashboard/store/materialIssueReq/CompleteMatReqDetails';
import Categories from '../dashboard/store/storecategories/Categories';
import Marketing from '../dashboard/marketing-sales/Marketing';
import OrderBookingForm from '../dashboard/marketing-sales/order booking form/OrderBookingForm';
import WeeklyProductionPlan from '../dashboard/production/weeklyProductionPlan/WeeklyProductionPlan';
import AddNewPlan from '../dashboard/production/addNewPlan/AddNewPlan';
import EditPlan from '../dashboard/production/editPlan/EditPlan';
import ViewPlan from '../dashboard/production/ViewPlan/ViewPlan';
import Shifts from '../dashboard/production/shifts/Shifts';
import ViewVendorDetails from '../dashboard/purchase/vendors/ViewVendorDetails';
import ViewAppSuppDetails from '../dashboard/purchase/approve supplier list/ViewAppSuppDetails';
import PrintVendorOrderList from '../dashboard/purchase/purchase order list/PrintVendorOrderList';
import PrintEmpDetails from '../dashboard/hr/employees/PrintEmpDetails';
import TrainingNeedPreReq from '../dashboard/hr/training need pre req/TrainingNeedPreReq';
import NonExecPrereq from '../dashboard/hr/employees performance/non-executive/pre-requisites/NonExecPrereq';
import NonExecEmpRatings from '../dashboard/hr/employees performance/non-executive/non-exec emp ratings/NonExecEmpRatings';
import NonExecEmpAssestPerform from '../dashboard/hr/employees performance/non-executive/non-exec emp assest perform/NonExecEmpAssestPerform';
import PrintNonExecEmpDetails from '../dashboard/hr/employees performance/non-executive/non-exec emp assest perform/PrintNonExecEmpDetails';
import HiredEmpDetails from '../dashboard/hr/employees/hired/HiredEmpDetails';
import PrintHiredEmpDetails from '../dashboard/hr/employees/hired/PrintHiredEmpDetails';
import ExecPreReq from '../dashboard/hr/employees performance/executive/executive pre-requsite/ExecPreReq';
import ExecEmpRatings from '../dashboard/hr/employees performance/executive/exec emp ratings/ExecEmpRatings';
import ExecEmpAssestPerform from '../dashboard/hr/employees performance/executive/exec emp assest perform/ExecEmpAssestPerform';
import PrintExecEmpDetails from '../dashboard/hr/employees performance/executive/exec emp assest perform/PrintExecEmpDetails';
import PrintJobDescription from '../dashboard/hr/job description/PrintJobDescription';
import TrainingVenue from '../dashboard/hr/training venue/TrainingVenue';
import PrintTrainingNeedIdentification from '../dashboard/hr/training need/PrintTrainingNeedIdentification';
import PrintTrainingPlan from '../dashboard/hr/training plan/PrintTrainingPlan';
import PrintTrainingAttendance from '../dashboard/hr/training attendance/PrintTrainingAttendance';
import PrintTrainingRecord from '../dashboard/hr/training record/PrintTrainingRecord';
import EmpCompetencEval from '../dashboard/hr/emp competence eval/EmpCompetencEval';
import PrintEmpCompEval from '../dashboard/hr/emp competence eval/PrintEmpCompEval';
import DeliveryOrder from '../dashboard/marketing-sales/deliveryOrder/DeliveryOrder';
import Responsibilities from '../dashboard/hr/responsibilities/Responsibilities';
import Authorities from '../dashboard/hr/authorities/Authorities';
import EditEmp from '../dashboard/hr/employees/EditEmp';
import Units from '../dashboard/purchase/units/Units';
import SubCategory from '../dashboard/purchase/subCategory/SubCategory';
import PrintAllAppSuppList from '../dashboard/purchase/approve supplier list/PrintAllAppSuppList';
import PrintPurchaseReq from '../dashboard/store/materialIssueReq/PrintPurchaseReq';
import PrintAllComMatIssueReq from '../dashboard/store/materialIssueReq/PrintAllComMatIssueReq';
import ViewSuppEvalForms from '../dashboard/purchase/supplier eval form/ViewSuppEvalForms';
import PrintSuppEvalForm from '../dashboard/purchase/supplier eval form/PrintSuppEvalForm';
import ViewAllNonExecAssest from '../dashboard/hr/employees performance/non-executive/non-exec emp assest perform/ViewAllNonExecAssest';
import ViewAllExecEmpAssest from '../dashboard/hr/employees performance/executive/exec emp assest perform/ViewAllExecEmpAssest';
import ViewBinCardHistory from '../dashboard/store/productsBinCard/ViewBinCardHistory';
import PrintBinCard from '../dashboard/store/productsBinCard/PrintBinCard';
import PrintVehicleInspectList from '../dashboard/store/vehicleInspectCheck/PrintVehicleInspectList';
import Inwards from '../dashboard/store/inwards/Inwards';
import Outwards from '../dashboard/store/outwards/Outwards';
import ItemInward from '../dashboard/store/inwards/ItemInward';
import InwardApproval from '../dashboard/store/inwards/InwardApproval';
import InwardGatepass from '../dashboard/store/inwards/InwardGatepass';
import PrintItemInward from '../dashboard/store/inwards/PrintItemInward';
import PrintInwardGatepass from '../dashboard/store/inwards/PrintInwardGatepass';
import PrintInwardApproval from '../dashboard/store/inwards/PrintInwardApproval';
import ItemOutwards from '../dashboard/store/outwards/ItemOutwards';
import OrderLogSheet from '../dashboard/marketing-sales/order log sheet/OrderLogSheet';
import DailyInwardReports from '../dashboard/store/inwards/DailyInwardReports';
import PrintStockAssesment from '../dashboard/store/stock assessment report/PrintStockAssesment';
import AddAccounts from '../dashboard/Accounts/Finance/create-accounts/AddAccounts';
import AccountHistory from '../dashboard/Accounts/Finance/ledger/Ledger';
import Ledger from '../dashboard/Accounts/Finance/ledger/Ledger';
import PrintLedger from '../dashboard/Accounts/Finance/ledger/PrintLedger';
import Entries from '../dashboard/Accounts/Finance/entries/Entries';
import PrintOrderLogSheet from '../dashboard/marketing-sales/order log sheet/PrintOrderLogSheet';
import SalesContract from '../dashboard/marketing-sales/sales contract/SalesContract';
import PrintSalesContract from '../dashboard/marketing-sales/sales contract/PrintSalesContract';



const Router = () => {
    return (
        <BrowserRouter>
            <Router>
                <Router exact path="/" component={Login} />
                <Router exact path="/sidenav" component={Sidenav} />
                {/* ===================================================================== */}
                <Router exact path="/purchasedashboard" component={PurchaseDashboard} />       //Purchase Module Routes
                <Router exact path="/purchase/units" component={Units} />
                <Router exact path="/purchase/category" component={Category} />
                <Router exact path="/purchase/sub_categories" component={SubCategory} />
                <Router exact path="/purchase/department" component={Department} />
                <Router exact path="/purchase/material" component={Material} />
                <Router exact path="/purchase/vendors" component={Vendors} />
                <Router exact path="/purchase/vendors/vendor_details/:id" component={ViewVendorDetails} />
                <Router exact path="/purchase/supplier_evaluation_form" component={SupplierEvalForm} />
                <Router exact path="/purchase/supplier_eval/view_supplier_evaluation_form" component={ViewSuppEvalForms} />
                <Router exact path="/purchase/supplier_eval/print_supplier_evaluation_form" component={PrintSuppEvalForm} />
                <Router exact path="/purchase/approved_supplier_list" component={AppSupplier} />
                <Router exact path="/purchase/print_all_approved_supplier_list" component={PrintAllAppSuppList} />
                <Router exact path="/purchase/approved_supplier_list/view_approved_supplier_details/:id" component={ViewAppSuppDetails} />
                <Router exact path="/purchase/purchase_order" component={PurchaseOrder} />
                <Router exact path="/purchase/purchase_order/print_order" component={PrintPurchaseOrder} />
                <Router exact path="/purchase/purchase_order_list" component={PurchaseOrderList} />
                <Router exact path="/purchase/purchase_order_list/order_details/:id" component={FullOrderDetails} />
                <Router exact path="/purchase/purchase_order_list/print_order_details/:id" component={PrintVendorOrderList} />
                <Router exact path="/purchase/purchase_requisition" component={PurchaseRequisition} />
                <Router exact path="/purchase/purchase_requisition/print_purchase_requisition" component={PurchaseReqPrint} />
                {/* ===================================================================== */}
                <Router exact path="/storedashboard" component={Store} />                      //Store Module Routes
                <Router exact path="/storedashboard/store_categories" component={Categories} />
                <Router exact path="/storedashboard/products" component={Products} />
                <Router exact path="/storedashboard/good_received_and_inspection_form" component={InspectionForm} />
                <Router exact path="/storedashboard/good_received_and_inspection_report/:id" component={GoodReceived} />
                <Router exact path="/storedashboard/good_received_and_inspection_report/good_rec_inspection_print/:id" component={GoodReceivedPrint} />
                <Router exact path="/storedashboard/products_bin_card" component={ProductsBinCard} />
                <Router exact path="/storedashboard/products_bin_card/view_bincard_history" component={ViewBinCardHistory} />
                <Router exact path="/storedashboard/products_bin_card/print_bin_card" component={PrintBinCard} />
                <Router exact path="/storedashboard/vehicles" component={Vehicles} />
                <Router exact path="/storedashboard/vehicle_inspect_checklist" component={VehicleInspectChecklist} />
                <Router exact path="/storedashboard/print_vehicle_inspect_checklist" component={PrintVehicleInspectList} />
                <Router exact path="/storedashboard/delivery_chalan" component={DeliveryChalan} />
                <Router exact path="/storedashboard/inwards" component={Inwards} />
                <Router exact path="/storedashboard/inwards/item_inward" component={ItemInward} />
                <Router exact path="/storedashboard/inwards/item_inward/print_inward_item" component={PrintItemInward} />
                <Router exact path="/storedashboard/inwards/inward_approval" component={InwardApproval} />
                <Router exact path="/storedashboard/inwards/item_inward/print_inward_approval" component={PrintInwardApproval} />
                <Router exact path="/storedashboard/inwards/inward_gatepass" component={InwardGatepass} />
                <Router exact path="/storedashboard/inwards/item_inward/print_inward_gatepass" component={PrintInwardGatepass} />
                <Router exact path="/storedashboard/outwards" component={Outwards} />
                <Router exact path="/storedashboard/outwards/item_outwards" component={ItemOutwards} />
                <Router exact path="/storedashboard/daily_inwards_report" component={DailyInwardReports} />
                <Router exact path="/storedashboard/daily_consumption_report" component={DailyConsumptionReport} />
                <Router exact path="/storedashboard/department_wise_consumption_report" component={DeptWiseConsReport} />
                <Router exact path="/storedashboard/department_wise_store_inventory" component={DeptWiseStoreInventory} />
                <Router exact path="/storedashboard/material_issue_requisition" component={MaterialIssueReq} />
                <Router exact path="/storedashboard/print_purchase_issue_requisition" component={PrintPurchaseReq} />
                <Router exact path="/storedashboard/material_issue_requisition/material_requisition_details/:id" component={MaterialReqDetails} />
                <Router exact path="/storedashboard/material_issue_requisition/complete_material_issue_requisition" component={CompleteMaterialReq} />
                <Router exact path="/storedashboard/material_issue_requisition/complete_requisition_details/:id" component={CompleteMatReqDetails} />
                <Router exact path="/storedashboard/material_issue_requisition/print_all_complete_requisition_details" component={PrintAllComMatIssueReq} />
                <Router exact path="/storedashboard/delivery_order/order_details" component={OrderDetails} />
                <Router exact path="/storedashboard/outward_gatepass" component={OutwardGatePass} />
                <Router exact path="/storedashboard/outward_gatepass/print_outward_gatepass" component={OutGatePassPrint} />
                <Router exact path="/storedashboard/stock_assessment_report" component={StockAssessReport} />
                <Router exact path="/storedashboard/stock_assessment_report/print_stock_assesment_report" component={PrintStockAssesment} />
                {/* ===================================================================== */}
                <Router exact path="/hr_dashboard" component={HR} />                 //HR Module Routes
                <Router exact path="/hr/designation" component={Designation} />
                <Router exact path="/hr/education" component={Education} />
                <Router exact path="/hr/skills" component={Skills} />
                <Router exact path="/hr/experience" component={Experience} />
                <Router exact path="/hr/responsibilities" component={Responsibilities} />
                <Router exact path="/hr/authorities" component={Authorities} />
                <Router exact path="/hr/training" component={Training} />
                <Router exact path="/hr/competence_criteria" component={CompetenceCriteria} />
                <Router exact path="/hr/competence_criteria_print" component={CompetenceCriteriaPrint} />
                <Router exact path="/hr/emp_competency_evaluation" component={EmpCompetencEval} />
                <Router exact path="/hr/print_emp_competency_evaluation" component={PrintEmpCompEval} />
                <Router exact path="/hr/employees" component={Employees} />
                <Router exact path="/hr/edit_emp_details" component={EditEmp} />
                <Router exact path="/hr/employees/view_emp_details" component={ViewEmpDetails} />
                <Router exact path="/hr/employees/print_emp_details" component={PrintEmpDetails} />
                <Router exact path="/hr/employees/hired_employee_details" component={HiredEmpDetails} />
                <Router exact path="/hr/employees/print_hired_employee_details" component={PrintHiredEmpDetails} />
                <Router exact path="/hr/employees_salaries" component={EmpSalaries} />
                <Router exact path="/hr/employees_leave" component={EmpLeave} />
                <Router exact path="/hr/employees_attendance" component={EmpAttendance} />
                <Router exact path="/hr/employees_attendance/add_new_attendance" component={AddEmpAttendance} />
                <Router exact path="/hr/employees_performance_assessment" component={EmployeePerformance} />
                <Router exact path="/hr/performance_assessment/non_executive_emp_prerequisites" component={NonExecPrereq} />
                <Router exact path="/hr/performance_assessment/non_executive_emp_ratings" component={NonExecEmpRatings} />
                <Router exact path="/hr/performance_assessment/non_executive_emp_assest_performance" component={NonExecEmpAssestPerform} />
                <Router exact path="/hr/performance_assessment/view_non_executive_emp_assest" component={ViewAllNonExecAssest} />
                <Router exact path="/hr/performance_assessment/print_non_executive_emp_performance" component={PrintNonExecEmpDetails} />
                <Router exact path="/hr/performance_assessment/executive_emp_prerequisites" component={ExecPreReq} />
                <Router exact path="/hr/performance_assessment/executive_emp_ratings" component={ExecEmpRatings} />
                <Router exact path="/hr/performance_assessment/executive_emp_assest_performance" component={ExecEmpAssestPerform} />
                <Router exact path="/hr/performance_assessment/view_executive_emp_assest" component={ViewAllExecEmpAssest} />
                <Router exact path="/hr/performance_assessment/print_executive_emp_performance" component={PrintExecEmpDetails} />
                <Router exact path="/hr/trainings" component={Trainings} />
                <Router exact path="/hr/training_venue" component={TrainingVenue} />
                <Router exact path="/hr/training_need_pre-requests" component={TrainingNeedPreReq} />
                <Router exact path="/hr/training_need_identification" component={TrainingNeed} />
                <Router exact path="/hr/print_training_need_identification" component={PrintTrainingNeedIdentification} />
                <Router exact path="/hr/training_plan" component={TrainingPlan} />
                <Router exact path="/hr/print_training_plan" component={PrintTrainingPlan} />
                <Router exact path="/hr/training_attendance" component={TrainingAttendance} />
                <Router exact path="/hr/print_training_attendance" component={PrintTrainingAttendance} />
                <Router exact path="/hr/training_record_and_evaluation" component={TrainingRecord} />
                <Router exact path="/hr/print_training_record_and_evaluation" component={PrintTrainingRecord} />
                <Router exact path="/hr/job_description" component={JobDescription} />
                <Router exact path="/hr/print_job_description" component={PrintJobDescription} />
                <Router exact path="/hr/employees_promotion" component={EmployeePromotion} />
                {/* ===================================================================== */}
                <Router exact path="/marketing_dashboard" component={Marketing} />                 //Marketing/Sales Module Routes
                <Router exact path="/marketing_dashboard/order_booking_form" component={OrderBookingForm} />
                <Router exact path="/marketing_dashboard/order_log_sheet" component={OrderLogSheet} />
                <Router exact path="/marketing_dashboard/print_order_log_sheet" component={PrintOrderLogSheet} />
                <Router exact path="/marketing_dashboard/sales_contract" component={SalesContract} />
                <Router exact path="/marketing_dashboard/print_sales_contract" component={PrintSalesContract} />
                <Router exact path="/marketing/delivery_order" component={DeliveryOrder} />
                {/* ===================================================================== */}
                <Route
                    exact
                    path='/productionDashboard/weekly-production-plan'
                    component={WeeklyProductionPlan}
                />
                <Route
                    exact
                    path='/productionDashboard/weekly-production-plan/add-new-plan'
                    component={AddNewPlan}
                />
                <Route
                    exact
                    path='/productionDashboard/weekly-production-plan/edit_plan'
                    component={EditPlan}
                />
                <Route
                    exact
                    path='/productionDashboard/weekly-production-plan/:planId'
                    component={ViewPlan}
                />
                <Route exact path='/productionDashboard/shifts' component={Shifts} />
                
                {/* ===================================================================== */}
                <Router exact path="/finance/accounts/add_accounts" component={AddAccounts} />                 //Accounts Module Routes
                <Router exact path="/finance/accounts/ledger" component={Ledger} />
                <Router exact path="/finance/accounts/ledger/print_ledger" component={PrintLedger} />
                <Router exact path="/finance/accounts/entries/add_entry" component={Entries} />
            </Router>
        </BrowserRouter>
    )
}

export default Router
