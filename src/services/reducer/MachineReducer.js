import {
	MACHINE_FETCH_FAIL,
	MACHINE_FETCH_REQUEST,
	MACHINE_FETCH_SUCCESS,
} from '../constants/MachineConst';

export const fetchMachineReducer = (state = { machines: [] }, action) => {
	switch (action.type) {
		case MACHINE_FETCH_REQUEST:
			return {
				loading: true,
			};
		case MACHINE_FETCH_SUCCESS:
			return {
				loading: false,
				machines: action.payload,
			};
		case MACHINE_FETCH_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
