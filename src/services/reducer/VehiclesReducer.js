import {
	VEHICLE_CREATE_SUCCESS,
	VEHICLE_DELETE_SUCCESS,
	VEHICLE_FAIL,
	VEHICLE_FETCH_SUCCESS,
	VEHICLE_REQUEST,
	VEHICLE_UPDATE_SUCCESS,
} from '../constants/VehiclesConst';

export const vehicleReducer = (state = { vehicles: [] }, action) => {
	switch (action.type) {
		case VEHICLE_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case VEHICLE_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case VEHICLE_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				vehicles: action.payload,
			};
		case VEHICLE_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				vehicles: state.vehicles.map((vehicle) =>
					vehicle._id === action.payload._id ? action.payload : vehicle,
				),
			};
		case VEHICLE_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				vehicles: state.vehicles.filter(
					(vehicle) => vehicle._id !== action.payload,
				),
			};
		case VEHICLE_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				vehicles: [...state.vehicles, action.payload],
			};

		default:
			return state;
	}
};
