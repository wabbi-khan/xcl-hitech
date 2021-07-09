import {
	TRAININGVENUE_CREATE_SUCCESS,
	TRAININGVENUE_DELETE_SUCCESS,
	TRAININGVENUE_FAIL,
	TRAININGVENUE_FETCH_SUCCESS,
	TRAININGVENUE_REQUEST,
	TRAININGVENUE_UPDATE_SUCCESS,
} from '../constants/TrainingVenueConstant';

export const getTrainingsVenues = (state = { venues: [] }, action) => {
	switch (action.type) {
		case TRAININGVENUE_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case TRAININGVENUE_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case TRAININGVENUE_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				venues: action.payload,
			};
		case TRAININGVENUE_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				venues: state.venues.map((venue) =>
					venue._id === action.payload._id ? action.payload : venue,
				),
			};
		case TRAININGVENUE_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				venues: state.venues.filter((venue) => venue._id !== action.payload),
			};
		case TRAININGVENUE_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				venues: [...state.venues, action.payload],
			};

		default:
			return state;
	}
};
