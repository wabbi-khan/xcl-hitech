import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { fetchMaterialReducer } from './services/reducer/MaterialReducer'
import { fetchCategoryReducer } from './services/reducer/MatCategoryReducer'
import { fetchVendorReducer } from './services/reducer/VendorReducer'
import { fetchPersonsReducer } from './services/reducer/PersonReducer'

const initialState = {}

const reducer = combineReducers({
    materials: fetchMaterialReducer,
    categories: fetchCategoryReducer,
    vendors: fetchVendorReducer,
    persons: fetchPersonsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)) 
)

export default store