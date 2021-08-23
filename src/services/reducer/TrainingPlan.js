import {
	TRAININGPLAN_CREATE_SUCCESS,
	TRAININGPLAN_DELETE_SUCCESS,
	TRAININGPLAN_FAIL,
	TRAININGPLAN_FETCH_SUCCESS,
	TRAININGPLAN_REQUEST,
	TRAININGPLAN_UPDATE_SUCCESS,
} from '../constants/TrainingPlan';

export const getTrainingsPlanes = (state = { plans: [] }, action) => {
	switch (action.type) {
		case TRAININGPLAN_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case TRAININGPLAN_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case TRAININGPLAN_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				plans: action.payload,
			};
		case TRAININGPLAN_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				plans: state.plans.map((plan) =>
					plan._id === action.payload._id ? action.payload : plan,
				),
			};
		case TRAININGPLAN_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				plans: state.plans.filter((plan) => plan._id !== action.payload),
			};
		case TRAININGPLAN_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				plans: [action.payload, ...state.plans],
			};

		default:
			return state;
	}
};
