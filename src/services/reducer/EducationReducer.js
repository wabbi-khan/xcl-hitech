import {
	EDUCATION_CREATE_SUCCESS,
	EDUCATION_DELETE_SUCCESS,
	EDUCATION_FAIL,
	EDUCATION_FETCH_SUCCESS,
	EDUCATION_REQUEST,
	EDUCATION_UPDATE_SUCCESS,
} from '../constants/EducationConst';

export const getEducations = (state = { educations: [] }, action) => {
	switch (action.type) {
		case EDUCATION_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case EDUCATION_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case EDUCATION_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				educations: action.payload,
			};
		case EDUCATION_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				educations: state.educations.map((education) =>
					education._id === action.payload._id ? action.payload : education
				),
			};
		case EDUCATION_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				educations: state.educations.filter(
					(education) => education._id !== action.payload
				),
			};
		case EDUCATION_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				educations: [action.payload, ...state.educations],
			};

		default:
			return state;
	}
};
