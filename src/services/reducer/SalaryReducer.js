import {
	SALARY_FAIL,
	SALARY_REQUEST,
	SALARY_FETCH_SUCCESS,
	SALARY_CREATE_SUCCESS,
	SALARY_DELETE_SUCCESS,
	SALARY_UPDATE_SUCCESS,
} from '../constants/SalaryConstant';

export const fetchSalaryReducer = (state = { salaries: [] }, action) => {
	switch (action.type) {
		case SALARY_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case SALARY_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case SALARY_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				salaries: action.payload,
			};
		case SALARY_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				salaries: state.salaries.map((salary) =>
					salary._id === action.payload.salary._id ? action.payload.salary : salary,
				),
				verifiedMsg: action.payload.verifiedMsg,
			};
		case SALARY_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				salaries: state.salaries.filter((salary) => salary._id !== action.payload),
			};
		case SALARY_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				salaries: [...state.salaries, ...action.payload],
			};
		default:
			return state;
	}
};
