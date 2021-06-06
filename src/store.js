import { 
    applyMiddleware, 
    combineReducers, 
    compose, 
    createStore 
} 
from 'redux';
import thunk from 'redux-thunk';
import { fetchMaterialReducer } from './services/reducer/MaterialReducer'
import { fetchCategoryReducer } from './services/reducer/MatCategoryReducer'
import { 
    fetchNonVerifiedVendorReducer, 
    fetchVendorReducer, 
    fetchAppSuppListReducer 
} 
from './services/reducer/VendorReducer'
import { fetchPersonsReducer } from './services/reducer/PersonReducer'
import { 
    fetchPurchaseOrderReducer, 
    fetchSinglePurchaseOrderReducer 
} 
from './services/reducer/OrdersReducer';
import { fetchProductsReducer } from './services/reducer/ProductsReducer';
import { fetchVehiclesReducer } from './services/reducer/VehiclesReducer';
import { fetchDesignationsReducer } from './services/reducer/DesignationReducer';
import { fetchDepartmentsReducer } from './services/reducer/DepartmentsReducer';
import { 
    fetchReqReducer, 
    fetchSingleReqReducer 
} 
from './services/reducer/PurchaseReqReducer';
import { fetchStoreCatReducer } from './services/reducer/StoreCatReducer';
import { fetchEducationReducer } from './services/reducer/EducationReducer';
import { fetchSkillsReducer } from './services/reducer/SkillsReducer';
import { fetchExperienceReducer } from './services/reducer/ExperienceReducer';
import { fetchCompCriteriaReducer } from './services/reducer/CriteriaReducer';
import { fetchEmployeesReducer } from './services/reducer/EmployeesReducer';

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
    departments: fetchDepartmentsReducer,
    requests: fetchReqReducer,
    request: fetchSingleReqReducer,
    category: fetchStoreCatReducer,
    education: fetchEducationReducer,
    skills: fetchSkillsReducer,
    experience: fetchExperienceReducer,
    criteria: fetchCompCriteriaReducer,
    employee: fetchEmployeesReducer,

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)) 
)

export default store