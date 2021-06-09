import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { fetchMaterialReducer } from './services/reducer/MaterialReducer';
import { fetchCategoryReducer } from './services/reducer/MatCategoryReducer';
import {
	fetchNonVerifiedVendorReducer,
	fetchVendorReducer,
	fetchAppSuppListReducer,
} from './services/reducer/VendorReducer';
import { fetchPersonsReducer } from './services/reducer/PersonReducer';
import {
	fetchPurchaseOrderReducer,
	fetchSinglePurchaseOrderReducer,
} from './services/reducer/OrdersReducer';
import { fetchProductsReducer } from './services/reducer/ProductsReducer';
import { fetchVehiclesReducer } from './services/reducer/VehiclesReducer';
import { fetchDesignationsReducer } from './services/reducer/DesignationReducer';
import { fetchMachineReducer } from './services/reducer/MachineReducer';
import { fetchPlanReducer } from './services/reducer/PlanReducer';
import { fetchDepartmentsReducer } from './services/reducer/DepartmentsReducer';
import { fetchShiftReducer } from './services/reducer/ShiftReducer';
import { fetchProductionReportReducer } from './services/reducer/ProductionReportReducer';
import {
	fetchReqReducer,
	fetchSingleReqReducer,
} from './services/reducer/PurchaseReqReducer';

const initialState = {};

const reducer = combineReducers({
	materials: fetchMaterialReducer,
	categories: fetchCategoryReducer,
	vendors: fetchVendorReducer,
	verifiedVendors: fetchAppSuppListReducer,
	nonVerifiedVendors: fetchNonVerifiedVendorReducer,
	persons: fetchPersonsReducer,
	orders: fetchPurchaseOrderReducer,
	order: fetchSinglePurchaseOrderReducer,
	products: fetchProductsReducer,
	vehicles: fetchVehiclesReducer,
	designations: fetchDesignationsReducer,
	departments: fetchDepartmentsReducer,
	requests: fetchReqReducer,
	request: fetchSingleReqReducer,
	machines: fetchMachineReducer,
	plans: fetchPlanReducer,
	shifts: fetchShiftReducer,
	productionReports: fetchProductionReportReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	initialState,
	composeEnhancers(applyMiddleware(thunk)),
);

export default store;
