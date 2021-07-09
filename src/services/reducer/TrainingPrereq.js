import {
	TRAININGPREREQ_CREATE_SUCCESS,
	TRAININGPREREQ_DELETE_SUCCESS,
	TRAININGPREREQ_FAIL,
	TRAININGPREREQ_FETCH_SUCCESS,
	TRAININGPREREQ_REQUEST,
	TRAININGPREREQ_UPDATE_SUCCESS,
} from '../constants/TrainingPrereq';

export const getTrainingsPrereqReducer = (
	state = { requisitions: [] },
	action,
) => {
	switch (action.type) {
		case TRAININGPREREQ_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case TRAININGPREREQ_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case TRAININGPREREQ_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				requisitions: action.payload,
			};
		case TRAININGPREREQ_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				requisitions: state.requisitions.map((requisition) =>
					requisition._id === action.payload._id ? action.payload : requisition,
				),
			};
		case TRAININGPREREQ_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				requisitions: state.requisitions.filter(
					(requisition) => requisition._id !== action.payload,
				),
			};
		case TRAININGPREREQ_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				requisitions: [...state.requisitions, action.payload],
			};

		default:
			return state;
	}
};
