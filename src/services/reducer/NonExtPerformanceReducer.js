import {
	NONEXTPERFORMANCE_FAIL,
	NONEXTPERFORMANCE_REQUEST,
	NONEXTPERFORMANCE_FETCH_SUCCESS,
	NONEXTPERFORMANCE_CREATE_SUCCESS,
	NONEXTPERFORMANCE_UPDATE_SUCCESS,
	NONEXTPERFORMANCE_DELETE_SUCCESS,
} from '../constants/NonExtPerformanceConstant';

export const fetchNonExecPerformanceReducer = (
	state = { nonExecPerformance: [] },
	action,
) => {
	switch (action.type) {
		case NONEXTPERFORMANCE_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case NONEXTPERFORMANCE_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case NONEXTPERFORMANCE_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				nonExecPerformance: action.payload,
			};
		case NONEXTPERFORMANCE_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				nonExecPerformance: state.nonExecPerformance.map((nonExecPerformance) =>
					nonExecPerformance._id === action.payload.rating._id
						? action.payload.rating
						: nonExecPerformance,
				),
			};
		case NONEXTPERFORMANCE_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				nonExecPerformance: [...state.nonExecPerformance, action.payload],
			};
		case NONEXTPERFORMANCE_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				nonExecPerformance: state.nonExecPerformance.filter(
					(nonExecPerformance) => nonExecPerformance._id !== action.payload,
				),
			};
		default:
			return state;
	}
};
