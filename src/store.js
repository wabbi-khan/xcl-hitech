import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { fetchMaterialReducer } from './services/reducer/MaterialReducer';
import { fetchCategoryReducer } from './services/reducer/MatCategoryReducer';
import { fetchVendorReducer } from './services/reducer/VendorReducer';
import { fetchPersonsReducer } from './services/reducer/PersonReducer';
import { fetchPurchaseOrderReducer } from './services/reducer/OrdersReducer';
import { fetchProductsReducer } from './services/reducer/ProductsReducer';
import { fetchVehiclesReducer } from './services/reducer/VehiclesReducer';
import { fetchDesignation } from './services/reducer/DesignationReducer';
import { fetchSkills } from './services/reducer/SkillsReducer';
import { fetchCompCriteriaReducer } from './services/reducer/CriteriaReducer';
import { getEmployees } from './services/reducer/EmployeesReducer';
import { fetchMachineReducer } from './services/reducer/MachineReducer';
import { fetchPlanReducer } from './services/reducer/PlanReducer';
import { fetchDepartmentsReducer } from './services/reducer/DepartmentsReducer';
import { fetchShiftReducer } from './services/reducer/ShiftReducer';
import { fetchProductionReportReducer } from './services/reducer/ProductionReportReducer';
import { fetchCardReducer } from './services/reducer/CardReducer';
import { fetchPurchaseReqReducer } from './services/reducer/PurchaseReqReducer';
import { getExperiences } from './services/reducer/ExperienceReducer';
import { getEducations } from './services/reducer/EducationReducer';
import { getTrainings } from './services/reducer/TrainingReducer';
import { fetchSalaryReducer } from './services/reducer/SalaryReducer';
import { fetchAttendanceReducer } from './services/reducer/attendanceReducer';
import { fetchLeaveReducer } from './services/reducer/LeaveReducer';

const initialState = {};

const reducer = combineReducers({
	materials: fetchMaterialReducer,
	categories: fetchCategoryReducer,
	vendors: fetchVendorReducer,
	persons: fetchPersonsReducer,
	orders: fetchPurchaseOrderReducer,
	products: fetchProductsReducer,
	vehicles: fetchVehiclesReducer,
	designations: fetchDesignation,
	departments: fetchDepartmentsReducer,
	purchaseRequisitions: fetchPurchaseReqReducer,
	educations: getEducations,
	skills: fetchSkills,
	experiences: getExperiences,
	criteria: fetchCompCriteriaReducer,
	employees: getEmployees,
	machines: fetchMachineReducer,
	plans: fetchPlanReducer,
	shifts: fetchShiftReducer,
	productionReports: fetchProductionReportReducer,
	cards: fetchCardReducer,
	trainings: getTrainings,
	salaries: fetchSalaryReducer,
	leaves: fetchLeaveReducer,
	attendances: fetchAttendanceReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	initialState,
	composeEnhancers(applyMiddleware(thunk)),
);

export default store;
