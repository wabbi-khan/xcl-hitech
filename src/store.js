import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { fetchMaterialReducer } from './services/reducer/MaterialReducer'
import { fetchCategoryReducer } from './services/reducer/MatCategoryReducer'
import { fetchNonVerifiedVendorReducer, fetchVendorReducer } from './services/reducer/VendorReducer'
import { fetchPersonsReducer } from './services/reducer/PersonReducer'
import { fetchAppSuppListReducer } from './services/reducer/AppSuppListReducer';

const initialState = {}

const reducer = combineReducers({
    materials: fetchMaterialReducer,
    categories: fetchCategoryReducer,
    vendors: fetchVendorReducer,
    verifiedVendors: fetchAppSuppListReducer,
    nonVerifiedVendors: fetchNonVerifiedVendorReducer,
    persons: fetchPersonsReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)) 
)

export default store