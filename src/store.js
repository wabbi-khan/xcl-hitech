import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore
} from "redux";
import thunk from "redux-thunk";
import {
    fetchPurchaseReqReducer,
    fetchCardReducer,
    fetchProductionReportReducer,
    fetchShiftReducer,
    fetchDepartmentsReducer,
    fetchPlanReducer,
    getEmployees,
    fetchCompCriteriaReducer,
    fetchSkills,
    fetchDesignation,
    vehicleReducer,
    productsReducer,
    fetchPurchaseOrderReducer,
    fetchMachineReducer,
    fetchCategoryReducer,
    fetchVendorReducer,
    fetchPersons,
    getExperiences,
    getEducations,
    getTrainings,
    fetchSalaryReducer,
    fetchAttendanceReducer,
    fetchLeaveReducer,
    fetchNonExecPerformanceReducer,
    fetchNonExecPrereqReducer,
    fetchNonExecRatReducer,
    authorityReducer,
    binCardReducer,
    deliveryOrderReducer,
    fetchAppSuppListReducer,
    fetchExecPrereqReducer,
    fetchExecRatReducer,
    fetchMaterialReducer,
    fetchStoreCategory,
    getTrainingEvaluations,
    getTrainingsAttendance,
    getTrainingsIdentification,
    getTrainingsPlanes,
    getTrainingsPrereqReducer,
    getTrainingsVenues,
    getUserReducer,
    inwardApprovalReducer,
    inwardGatePassReducer,
    inwardReducer,
    jobDescriptionReducer,
    outwardGatePassReducer,
    responsibilityReducer,
    subCategoryReducer,
    unitReducer,
    stockAssessmentReportReducer,
    accountReducer
} from './services/reducer'

const initialState = {};

const reducer = combineReducers({
    accounts: accountReducer,
    materials: fetchMaterialReducer,
    categories: fetchCategoryReducer,
    storeCategories: fetchStoreCategory,
    vendors: fetchVendorReducer,
    persons: fetchPersons,
    orders: fetchPurchaseOrderReducer,
    products: productsReducer,
    vehicles: vehicleReducer,
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
    nonExecPrereq: fetchNonExecPrereqReducer,
    nonExecRat: fetchNonExecRatReducer,
    nonExecPerformance: fetchNonExecPerformanceReducer,
    execPrereq: fetchExecPrereqReducer,
    execRat: fetchExecRatReducer,
    venues: getTrainingsVenues,
    requisitions: getTrainingsPrereqReducer,
    trainingPlanes: getTrainingsPlanes,
    trainingIdentifications: getTrainingsIdentification,
    trainingAttendance: getTrainingsAttendance,
    user: getUserReducer,
    responsibilities: responsibilityReducer,
    authorities: authorityReducer,
    units: unitReducer,
    trainingEvaluations: getTrainingEvaluations,
    subCategories: subCategoryReducer,
    jobDescriptions: jobDescriptionReducer,
    binCards: binCardReducer,
    inwards: inwardReducer,
    inwardGatePasses: inwardGatePassReducer,
    outwardGatePasses: outwardGatePassReducer,
    stockAssessmentReport: stockAssessmentReportReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;