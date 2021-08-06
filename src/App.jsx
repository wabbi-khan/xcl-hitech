import React from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Login from './login/Login';
import PurchaseDashboard from './dashboard/purchase/PurchaseDashboard';
import Material from './dashboard/purchase/material/Material';
import Dashboard from './dashboard/Dashboard';
import Loader from 'react-loader-spinner';
import Vendors from './dashboard/purchase/vendors/Vendors';
// import { createMuiTheme } from '@material-ui/core/styles';
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
import DeliveryChalan from './dashboard/store/deliveryChalan/DeliveryChalan';
import DailyInwardReports from './dashboard/store/dailyInwardReports/DailyInwardReports';
import DailyConsumptionReport from './dashboard/store/dailyConsReport/DailyConsumptionReport';
import DeptWiseConsReport from './dashboard/store/deptwiseConsReport/DeptWiseConsReport';
import DeptWiseStoreInventory from './dashboard/store/DeptWiseStoreInv/DeptWiseStoreInventory';
import MaterialIssueReq from './dashboard/store/materialIssueReq/MaterialIssueReq';
import OrderDetails from './dashboard/marketing-sales/deliveryOrder/OrderDetails';
import PrintPurchaseOrder from './dashboard/purchase/purchase order/PrintPurchaseOrder';
import PurchaseRequisition from './dashboard/purchase/purchaseReq/PurchaseRequisition';
import PurchaseReqPrint from './dashboard/purchase/purchaseReq/PurchaseReqPrint';
import GoodReceivedPrint from './dashboard/store/good rec and inspection rep/GoodReceivedPrint';
import OutwardGatePass from './dashboard/store/outward gate pass/OutwardGatePass';
import StockAssessReport from './dashboard/store/stock assessment report/StockAssessReport';
import OutGatePassPrint from './dashboard/store/outward gate pass/OutGatePassPrint';
import dotenv from 'dotenv';
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
import TrainingAttendanceView from './dashboard/hr/training attendance/ViewTraining';
import TrainingRecord from './dashboard/hr/training record/TrainingRecord';
import JobDescription from './dashboard/hr/job description/JobDescription';
import EmployeePromotion from './dashboard/hr/employees promotion/EmployeePromotion';
import CompetenceCriteriaPrint from './dashboard/hr/competence criteria/CompetenceCriteriaPrint';
import FullOrderDetails from './dashboard/purchase/purchase order list/FullOrderDetails';
import ContactPerson from './dashboard/purchase/contactPerson/ContactPerson';
import ViewEmpDetails from './dashboard/hr/employees/ViewEmpDetails';
import AddEmpAttendance from './dashboard/hr/emp attendance new/AddEmpAttendance';
import Category from './dashboard/purchase/category/Category';
import InspectionForm from './dashboard/store/good rec and inspection rep/InspectionForm';
import Designation from './dashboard/hr/designation/Designation';
import Education from './dashboard/hr/education/Education';
import Skills from './dashboard/hr/skills/Skills';
import Experience from './dashboard/hr/experience/Experience';
import Training from './dashboard/hr/training/Training';
import Department from './dashboard/purchase/department/Department';
import MaterialReqDetails from './dashboard/store/materialIssueReq/MaterialReqDetails';
import CompleteMaterialReq from './dashboard/store/materialIssueReq/CompleteMaterialReq';
import CompleteMatReqDetails from './dashboard/store/materialIssueReq/CompleteMatReqDetails';
import ProductionDashboard from './dashboard/production/production';
import Machines from './dashboard/production/machines/Machines';
import WeeklyProductionPlan from './dashboard/production/weeklyProductionPlan/WeeklyProductionPlan';
import AddNewPlan from './dashboard/production/addNewPlan/AddNewPlan';
import ViewPlan from './dashboard/production/ViewPlan/ViewPlan';
import EditPlan from './dashboard/production/EditPlan/EditPlan';
import Shifts from './dashboard/production/shifts/Shifts';
import Marketing from './dashboard/marketing-sales/Marketing';
import OrderBookingForm from './dashboard/marketing-sales/order booking form/OrderBookingForm';
import ViewVendorDetails from './dashboard/purchase/vendors/ViewVendorDetails';
import ViewAppSuppDetails from './dashboard/purchase/approve supplier list/ViewAppSuppDetails';
import PrintVendorOrderList from './dashboard/purchase/purchase order list/PrintVendorOrderList';
import ProductionReport from './dashboard/production/productionReport/ProductionReport';
import SetUpCard from './dashboard/production/setUpCard/SetUpCard';
import ProductionOnlineInsRep from './dashboard/production/productionOnlineInspectionReport/ProdctionOnlineInsRep';
import PrintEmpDetails from './dashboard/hr/employees/PrintEmpDetails';
import TrainingNeedPreReq from './dashboard/hr/training need pre req/TrainingNeedPreReq';
import NonExecPrereq from './dashboard/hr/employees performance/non-executive/pre-requisites/NonExecPrereq';
import NonExecEmpRatings from './dashboard/hr/employees performance/non-executive/non-exec emp ratings/NonExecEmpRatings';
import NonExecEmpAssestPerform from './dashboard/hr/employees performance/non-executive/non-exec emp assest perform/NonExecEmpAssestPerform';
import PrintNonExecEmpDetails from './dashboard/hr/employees performance/non-executive/non-exec emp assest perform/PrintNonExecEmpDetails';
import HiredEmpDetails from './dashboard/hr/employees/hired/HiredEmpDetails';
import PrintHiredEmpDetails from './dashboard/hr/employees/hired/PrintHiredEmpDetails';
import ExecPreReq from './dashboard/hr/employees performance/executive/executive pre-requsite/ExecPreReq';
import ExecEmpRatings from './dashboard/hr/employees performance/executive/exec emp ratings/ExecEmpRatings';
import ExecEmpAssestPerform from './dashboard/hr/employees performance/executive/exec emp assest perform/ExecEmpAssestPerform';
import PrintExecEmpDetails from './dashboard/hr/employees performance/executive/exec emp assest perform/PrintExecEmpDetails';
import PrintJobDescription from './dashboard/hr/job description/PrintJobDescription';
import TrainingVenue from './dashboard/hr/training venue/TrainingVenue';
import PrintTrainingNeedIdentification from './dashboard/hr/training need/PrintTrainingNeedIdentification';
import PrintTrainingPlan from './dashboard/hr/training plan/PrintTrainingPlan';
import PrintTrainingAttendance from './dashboard/hr/training attendance/PrintTrainingAttendance';
import PrintTrainingRecord from './dashboard/hr/training record/PrintTrainingRecord';
import EmpCompetencEval from './dashboard/hr/emp competence eval/EmpCompetencEval';
import PrintEmpCompEval from './dashboard/hr/emp competence eval/PrintEmpCompEval';
import DeliveryOrder from './dashboard/marketing-sales/deliveryOrder/DeliveryOrder';
import Categories from './dashboard/store/storecategories/Categories';
import Responsibilities from './dashboard/hr/responsibilities/Responsibilities';
import Authorities from './dashboard/hr/authorities/Authorities';
import ViewAllLeaves from './dashboard/hr/employees leave/ViewLeaves';

import { getUser } from './services/action/UserAction';
import PrivateRoute from './components/PrivateRoute';
import CeiledRoute from './components/CeiledRoute';
import EditEmp from './dashboard/hr/employees/EditEmp';
import Units from './dashboard/purchase/units/Units';
import SubCategory from './dashboard/purchase/subCategory/SubCategory';

dotenv.config();

// const theme = createMuiTheme({
// 	palette: {
// 		primary: {
// 			main: '#22a19a',
// 			secondary: '#00726c',
// 			contrastText: '#fff',
// 		},
// 	},
// });

function App() {
	const [appLoading, setAppLoading] = React.useState(true);
	const [error, setError] = React.useState('');
	const dispatch = useDispatch();

	React.useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(
				getUser((err) => {
					if (err) {
						setError(err);
					}
					setAppLoading(false);
				}),
			);
		} else {
			setAppLoading(false);
		}
	}, []);
	return appLoading ? (
		<div
			style={{
				width: '100%',
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<Loader type='TailSpin' width='8rem' height='8rem' />
		</div>
	) : error ? (
		<p>{error}</p>
	) : (
		<Switch>
			<CeiledRoute path='/' exact>
				<Login />
			</CeiledRoute>
			<PrivateRoute path='/dashboard' exact>
				<Dashboard />
			</PrivateRoute>
			<PrivateRoute exact path='/purchasedashboard'>
				<PurchaseDashboard />
			</PrivateRoute>
			<PrivateRoute exact path='/purchase/units'>
				<Units />
			</PrivateRoute>
			<PrivateRoute exact path='/purchase/contactPerson'>
				<ContactPerson />
			</PrivateRoute>
			<PrivateRoute exact path='/purchase/category'>
				<Category />
			</PrivateRoute>
			<PrivateRoute exact path='/purchase/sub_categories'>
				<SubCategory />
			</PrivateRoute>
			<PrivateRoute exact path='/purchase/department'>
				<Department />
			</PrivateRoute>
			<PrivateRoute exact path='/purchase/material'>
				<Material />
			</PrivateRoute>
			<PrivateRoute exact path='/purchase/vendors'>
				<Vendors />
			</PrivateRoute>
			<PrivateRoute exact path='/purchase/vendors/vendor_details/:id'>
				<ViewVendorDetails />
			</PrivateRoute>
			<PrivateRoute exact path='/purchase/supplier_evaluation_form'>
				<SupplierEvalForm />
			</PrivateRoute>
			<PrivateRoute exact path='/purchase/approved_supplier_list'>
				<AppSupplier />
			</PrivateRoute>
			<PrivateRoute
				exact
				path='/purchase/approved_supplier_list/view_approved_supplier_details/:id'>
				<ViewAppSuppDetails />
			</PrivateRoute>
			<PrivateRoute exact path='/purchase/purchase_order'>
				<PurchaseOrder />
			</PrivateRoute>
			<PrivateRoute exact path='/purchase/purchase_order/print_order'>
				<PrintPurchaseOrder />
			</PrivateRoute>
			<PrivateRoute exact path='/purchase/purchase_order_list'>
				<PurchaseOrderList />
			</PrivateRoute>
			<PrivateRoute exact path='/purchase/purchase_order_list/order_details/:id'>
				<FullOrderDetails />
			</PrivateRoute>
			<PrivateRoute
				exact
				path='/purchase/purchase_order_list/print_order_details/:id'>
				<PrintVendorOrderList />
			</PrivateRoute>
			<PrivateRoute exact path='/purchase/purchase_requisition'>
				<PurchaseRequisition />
			</PrivateRoute>
			<PrivateRoute
				exact
				path='/purchase/purchase_requisition/print_purchase_requisition'>
				<PurchaseReqPrint />
			</PrivateRoute>
			{/* ===================================================================== */}
			<Route exact path='/storedashboard' component={Store} />
			<Route
				exact
				path='/storedashboard/store_categories'
				component={Categories}
			/>
			<Route exact path='/storedashboard/products' component={Products} />
			<Route
				exact
				path='/storedashboard/good_received_and_inspection_form'
				component={InspectionForm}
			/>
			<Route
				exact
				path='/storedashboard/good_received_and_inspection_report/:id'
				component={GoodReceived}
			/>
			<Route
				exact
				path='/storedashboard/good_received_and_inspection_report/good_rec_inspection_print/:id'
				component={GoodReceivedPrint}
			/>
			<Route
				exact
				path='/storedashboard/products_bin_card'
				component={ProductsBinCard}
			/>
			<Route exact path='/storedashboard/vehicles' component={Vehicles} />
			<Route
				exact
				path='/storedashboard/vehicle_inspect_checklist'
				component={VehicleInspectChecklist}
			/>
			<Route exact path='/marketing/delivery_order' component={DeliveryOrder} />
			<Route
				exact
				path='/storedashboard/delivery_chalan'
				component={DeliveryChalan}
			/>
			<Route
				exact
				path='/storedashboard/daily_inwards_report'
				component={DailyInwardReports}
			/>
			<Route
				exact
				path='/storedashboard/daily_consumption_report'
				component={DailyConsumptionReport}
			/>
			<Route
				exact
				path='/storedashboard/department_wise_consumption_report'
				component={DeptWiseConsReport}
			/>
			<Route
				exact
				path='/storedashboard/department_wise_store_inventory'
				component={DeptWiseStoreInventory}
			/>
			<Route
				exact
				path='/storedashboard/material_issue_requisition'
				component={MaterialIssueReq}
			/>
			<Route
				exact
				path='/storedashboard/material_issue_requisition/material_requisition_details/:id'
				component={MaterialReqDetails}
			/>
			<Route
				exact
				path='/storedashboard/material_issue_requisition/complete_material_issue_requisition'
				component={CompleteMaterialReq}
			/>
			<Route
				exact
				path='/storedashboard/material_issue_requisition/complete_requisition_details/:id'
				component={CompleteMatReqDetails}
			/>
			<Route
				exact
				path='/storedashboard/delivery_order/order_details'
				component={OrderDetails}
			/>
			<Route
				exact
				path='/storedashboard/outward_gatepass'
				component={OutwardGatePass}
			/>
			<Route
				exact
				path='/storedashboard/outward_gatepass/print_outward_gatepass'
				component={OutGatePassPrint}
			/>
			<Route
				exact
				path='/storedashboard/stock_assessment_report'
				component={StockAssessReport}
			/>
			{/* ===================================================================== */}
			<Route exact path='/hr_dashboard' component={HR} />
			<Route exact path='/hr/designation' component={Designation} />
			<Route exact path='/hr/education' component={Education} />
			<Route exact path='/hr/skills' component={Skills} />
			<Route exact path='/hr/experience' component={Experience} />
			<Route exact path='/hr/responsibilities' component={Responsibilities} />
			<Route exact path='/hr/authorities' component={Authorities} />
			<Route exact path='/hr/training' component={Training} />
			<Route exact path='/hr/competence_criteria' component={CompetenceCriteria} />
			<Route
				exact
				path='/hr/competence_criteria_print'
				component={CompetenceCriteriaPrint}
			/>
			<Route
				exact
				path='/hr/emp_competency_evaluation'
				component={EmpCompetencEval}
			/>
			<Route
				exact
				path='/hr/print_emp_competency_evaluation'
				component={PrintEmpCompEval}
			/>
			<Route exact path='/hr/employees' component={Employees} />
			<Route exact path='/hr/edit_emp_details' component={EditEmp} />
			<Route
				exact
				path='/hr/employees/view_emp_details'
				component={ViewEmpDetails}
			/>
			<Route
				exact
				path='/hr/employees/print_emp_details/:id'
				component={PrintEmpDetails}
			/>
			<Route
				exact
				path='/hr/employees/hired_employee_details/:id'
				component={HiredEmpDetails}
			/>
			<Route
				exact
				path='/hr/employees/print_hired_employee_details'
				component={PrintHiredEmpDetails}
			/>
			<Route exact path='/hr/employees_salaries' component={EmpSalaries} />
			<Route exact path='/hr/employees_leave' component={EmpLeave} />
			<Route exact path='/hr/employees_leave/view' component={ViewAllLeaves} />
			<Route exact path='/hr/employees_attendance' component={EmpAttendance} />
			<Route
				exact
				path='/hr/employees_attendance/add_new_attendance'
				component={AddEmpAttendance}
			/>
			<Route
				exact
				path='/hr/employees_performance_assessment'
				component={EmployeePerformance}
			/>
			<Route
				exact
				path='/hr/performance_assessment/non_executive_emp_prerequisites'
				component={NonExecPrereq}
			/>
			<Route
				exact
				path='/hr/performance_assessment/non_executive_emp_ratings'
				component={NonExecEmpRatings}
			/>
			<Route
				exact
				path='/hr/performance_assessment/non_executive_emp_assest_performance'
				component={NonExecEmpAssestPerform}
			/>
			<Route
				exact
				path='/hr/performance_assessment/print_non_executive_emp_performance'
				component={PrintNonExecEmpDetails}
			/>
			<Route
				exact
				path='/hr/performance_assessment/executive_emp_prerequisites'
				component={ExecPreReq}
			/>
			<Route
				exact
				path='/hr/performance_assessment/executive_emp_ratings'
				component={ExecEmpRatings}
			/>
			<Route
				exact
				path='/hr/performance_assessment/executive_emp_assest_performance'
				component={ExecEmpAssestPerform}
			/>
			<Route
				exact
				path='/hr/performance_assessment/print_executive_emp_performance'
				component={PrintExecEmpDetails}
			/>
			<Route exact path='/hr/trainings' component={Trainings} />
			<Route exact path='/hr/training_venue' component={TrainingVenue} />
			<Route
				exact
				path='/hr/training_need_pre-requests'
				component={TrainingNeedPreReq}
			/>
			<Route
				exact
				path='/hr/training_need_identification'
				component={TrainingNeed}
			/>
			<Route
				exact
				path='/hr/print_training_need_identification'
				component={PrintTrainingNeedIdentification}
			/>
			<Route exact path='/hr/training_plan' component={TrainingPlan} />
			<Route exact path='/hr/print_training_plan' component={PrintTrainingPlan} />
			<Route exact path='/hr/training_attendance' component={TrainingAttendance} />
			<Route
				exact
				path='/hr/training_attendance/view'
				component={TrainingAttendanceView}
			/>
			<Route
				exact
				path='/hr/print_training_attendance'
				component={PrintTrainingAttendance}
			/>
			<Route
				exact
				path='/hr/training_record_and_evaluation'
				component={TrainingRecord}
			/>
			<Route
				exact
				path='/hr/print_training_record_and_evaluation'
				component={PrintTrainingRecord}
			/>
			<Route exact path='/hr/job_description' component={JobDescription} />
			<Route
				exact
				path='/hr/print_job_description'
				component={PrintJobDescription}
			/>
			<Route exact path='/hr/employees_promotion' component={EmployeePromotion} />
			{/* ===================================================================== */}
			<Route exact path='/marketing_dashboard' component={Marketing} />
			<Route
				exact
				path='/marketing_dashboard/order_booking_form'
				component={OrderBookingForm}
			/>
			{/* ===================================================================== */}
			<Route exact path='/productionDashboard' component={ProductionDashboard} />
			<Route exact path='/productionDashboard/machines' component={Machines} />
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
			<Route
				exact
				path='/productionDashboard/production-report'
				component={ProductionReport}
			/>
			<Route exact path='/productionDashboard/set-up-card' component={SetUpCard} />
			<Route
				exact
				path='/productionDashboard/production-online-inspection-report'
				component={ProductionOnlineInsRep}
			/>
		</Switch>
	);
}

export default withRouter(App);
