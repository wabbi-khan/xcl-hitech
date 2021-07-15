import {
	SKILL_CREATE_SUCCESS,
	SKILL_DELETE_SUCCESS,
	SKILL_FAIL,
	SKILL_FETCH_SUCCESS,
	SKILL_REQUEST,
	SKILL_UPDATE_SUCCESS,
} from '../constants/SkillsConst';

export const fetchSkills = (state = { skills: [] }, action) => {
	switch (action.type) {
		case SKILL_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case SKILL_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case SKILL_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				skills: action.payload,
			};
		case SKILL_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				skills: state.skills.map((skill) =>
					skill._id === action.payload._id ? action.payload : skill,
				),
			};
		case SKILL_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				skills: state.skills.filter((skill) => skill._id !== action.payload),
			};
		case SKILL_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				skills: [action.payload, ...state.skills],
			};

		default:
			return state;
	}
};
