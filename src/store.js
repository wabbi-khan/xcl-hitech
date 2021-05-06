import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { fetchMaterialReducer } from './services/reducer/MaterialReducer'
import { fetchCategoryReducer } from './services/reducer/MatCategoryReducer'

const initialState = {}

const reducer = combineReducers({
    materials: fetchMaterialReducer,
    categories: fetchCategoryReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)) 
)

export default store