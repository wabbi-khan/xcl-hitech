import {
	UNIT_CREATE_SUCCESS,
	UNIT_DELETE_SUCCESS,
	UNIT_FAIL,
	UNIT_FETCH_SUCCESS,
	UNIT_REQUEST,
	UNIT_UPDATE_SUCCESS,
} from '../constants/UnitConst';

export const unitReducer = (
	state = { units: [] },
	action,
) => {
	switch (action.type) {
		case UNIT_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case UNIT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case UNIT_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				units: action.payload,
			};
		case UNIT_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				units: state.units.map((unit) =>
					unit._id === action.payload._id
						? action.payload
						: unit,
				),
			};
		case UNIT_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				units: state.units.filter(
					(unit) => unit._id !== action.payload,
				),
			};
		case UNIT_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				units: [...state.units, action.payload],
			};

		default:
			return state;
	}
};
