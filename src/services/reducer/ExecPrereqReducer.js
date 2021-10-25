import {
	EXECPREREQ_FAIL,
	EXECPREREQ_REQUEST,
	EXECPREREQ_FETCH_SUCCESS,
	EXECPREREQ_CREATE_SUCCESS,
	EXECPREREQ_UPDATE_SUCCESS,
	EXECPREREQ_DELETE_SUCCESS,
} from '../constants/ExecPrereq';

export const fetchExecPrereqReducer = (state = { execPrereq: [] }, action) => {
	switch (action.type) {
		case EXECPREREQ_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case EXECPREREQ_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case EXECPREREQ_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				execPrereq: action.payload,
			};
		case EXECPREREQ_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				execPrereq: state.execPrereq.map((execPrereq) =>
					execPrereq._id === action.payload.requisition._id
						? action.payload.requisition
						: execPrereq
				),
			};
		case EXECPREREQ_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				execPrereq: [...state.execPrereq, action.payload],
			};
		case EXECPREREQ_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				execPrereq: state.execPrereq.filter(
					(execPrereq) => execPrereq._id !== action.payload
				),
			};
		default:
			return state;
	}
};
