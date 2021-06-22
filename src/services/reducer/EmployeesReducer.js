import {
	EMPLOYEE_CREATE_SUCCESS,
	EMPLOYEE_DELETE_SUCCESS,
	EMPLOYEE_FAIL,
	EMPLOYEE_FETCH_SUCCESS,
	EMPLOYEE_REQUEST,
	EMPLOYEE_UPDATE_SUCCESS,
} from '../constants/EmployeesConst';

export const getEmployees = (state = { employees: [] }, action) => {
	switch (action.type) {
		case EMPLOYEE_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case EMPLOYEE_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case EMPLOYEE_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				employees: action.payload,
			};
		case EMPLOYEE_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				employees: state.employees.map((employee) =>
					employee._id === action.payload._id ? action.payload : employee,
				),
			};
		case EMPLOYEE_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				employees: state.employees.filter(
					(employee) => employee._id !== action.payload,
				),
			};
		case EMPLOYEE_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				employees: [...state.employees, action.payload],
			};

		default:
			return state;
	}
};
