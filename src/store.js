import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { fetchMaterialReducer } from './services/reducer/MaterialReducer'
import { fetchCategoryReducer } from './services/reducer/MatCategoryReducer'
import { fetchNonVerifiedVendorReducer, fetchVendorReducer, fetchAppSuppListReducer } from './services/reducer/VendorReducer'
import { fetchPersonsReducer } from './services/reducer/PersonReducer'
import { fetchPurchaseOrderReducer, fetchSinglePurchaseOrderReducer } from './services/reducer/OrdersReducer';
import { fetchProductsReducer } from './services/reducer/ProductsReducer';
import { fetchVehiclesReducer } from './services/reducer/VehiclesReducer';
import { fetchDesignationsReducer } from './services/reducer/DesignationReducer';

const initialState = {}

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

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)) 
)

export default store