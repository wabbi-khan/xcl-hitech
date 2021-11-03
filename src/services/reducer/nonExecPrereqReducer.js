import {
	NONEXECPREREQ_FAIL,
	NONEXECPREREQ_REQUEST,
	NONEXECPREREQ_FETCH_SUCCESS,
	NONEXECPREREQ_CREATE_SUCCESS,
	NONEXECPREREQ_UPDATE_SUCCESS,
	NONEXECPREREQ_DELETE_SUCCESS,
} from '../constants/NonExecPrereq';

export const fetchNonExecPrereqReducer = (
	state = { nonExecPrereq: [] },
	action
) => {
	switch (action.type) {
		case NONEXECPREREQ_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case NONEXECPREREQ_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case NONEXECPREREQ_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				nonExecPrereq: action.payload,
			};
		case NONEXECPREREQ_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				nonExecPrereq: state.nonExecPrereq.map((nonExecPrereq) =>
					nonExecPrereq._id === action.payload.assessment._id
						? action.payload.assessment
						: nonExecPrereq
				),
			};
		case NONEXECPREREQ_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				nonExecPrereq: [...state.nonExecPrereq, action.payload],
			};
		case NONEXECPREREQ_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				nonExecPrereq: state.nonExecPrereq.filter(
					(nonExecPrereq) => nonExecPrereq._id !== action.payload
				),
			};
		default:
			return state;
	}
};
