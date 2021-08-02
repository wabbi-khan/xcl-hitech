import {
	TRAINING_EVALUATION_CREATE_SUCCESS,
	TRAINING_EVALUATION_DELETE_SUCCESS,
	TRAINING_EVALUATION_FAIL,
	TRAINING_EVALUATION_FETCH_SUCCESS,
	TRAINING_EVALUATION_REQUEST,
	TRAINING_EVALUATION_UPDATE_SUCCESS,
} from '../constants/TrainingEvaluationConstant';

export const getTrainingEvaluations = (
	state = { trainingEvaluations: [] },
	action,
) => {
	switch (action.type) {
		case TRAINING_EVALUATION_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case TRAINING_EVALUATION_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case TRAINING_EVALUATION_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				trainingEvaluations: action.payload,
			};
		case TRAINING_EVALUATION_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				trainingEvaluations: state.trainingEvaluations.map((trainingEvaluation) =>
					trainingEvaluation._id === action.payload._id
						? action.payload
						: trainingEvaluation,
				),
			};
		case TRAINING_EVALUATION_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				trainingEvaluations: state.trainingEvaluations.filter(
					(trainingEvaluation) => trainingEvaluation._id !== action.payload,
				),
			};
		case TRAINING_EVALUATION_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				trainingEvaluations: [...state.trainingEvaluations, action.payload],
			};

		default:
			return state;
	}
};
