import {
	TRAINING_CREATE_SUCCESS,
	TRAINING_DELETE_SUCCESS,
	TRAINING_FAIL,
	TRAINING_FETCH_SUCCESS,
	TRAINING_REQUEST,
	TRAINING_UPDATE_SUCCESS,
} from '../constants/TrainingConstant';

export const getTrainings = (state = { trainings: [] }, action) => {
	switch (action.type) {
		case TRAINING_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case TRAINING_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case TRAINING_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				trainings: action.payload,
			};
		case TRAINING_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				trainings: state.trainings.map((training) =>
					training._id === action.payload._id ? action.payload : training,
				),
			};
		case TRAINING_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				trainings: state.trainings.filter(
					(training) => training._id !== action.payload,
				),
			};
		case TRAINING_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				trainings: [action.payload, ...state.trainings],
			};

		default:
			return state;
	}
};
