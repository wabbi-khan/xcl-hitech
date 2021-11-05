import {
	EXPERIENCE_CREATE_SUCCESS,
	EXPERIENCE_DELETE_SUCCESS,
	EXPERIENCE_FAIL,
	EXPERIENCE_FETCH_SUCCESS,
	EXPERIENCE_REQUEST,
	EXPERIENCE_UPDATE_SUCCESS,
} from '../constants/ExperienceConst';

export const getExperiences = (state = { experiences: [] }, action) => {
	switch (action.type) {
		case EXPERIENCE_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case EXPERIENCE_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case EXPERIENCE_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				experiences: action.payload,
			};
		case EXPERIENCE_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				experiences: state.experiences.map((experience) =>
					experience._id === action.payload._id
						? action.payload
						: experience
				),
			};
		case EXPERIENCE_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				experiences: state.experiences.filter(
					(experience) => experience._id !== action.payload
				),
			};
		case EXPERIENCE_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				experiences: [action.payload, ...state.experiences],
			};

		default:
			return state;
	}
};
