import {
	DEPARTMENT_CREATE_SUCCESS,
	DEPARTMENT_DELETE_SUCCESS,
	DEPARTMENT_FAIL,
	DEPARTMENT_FETCH_SUCCESS,
	DEPARTMENT_REQUEST,
	DEPARTMENT_UPDATE_SUCCESS,
} from '../constants/DepartmentConst';

export const fetchDepartmentsReducer = (
	state = { departments: [] },
	action,
) => {
	switch (action.type) {
		case DEPARTMENT_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case DEPARTMENT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case DEPARTMENT_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				departments: action.payload,
			};
		case DEPARTMENT_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				departments: state.departments.map((department) =>
					department._id === action.payload._id ? action.payload : department,
				),
			};
		case DEPARTMENT_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				departments: state.departments.filter(
					(department) => department._id !== action.payload,
				),
			};
		case DEPARTMENT_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				departments: [action.payload, ...state.departments],
			};

		default:
			return state;
	}
};
