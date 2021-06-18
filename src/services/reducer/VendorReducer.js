import {
	VENDOR_FAIL,
	VENDOR_REQUEST,
	VENDOR_FETCH_SUCCESS,
	VENDOR_CREATE_SUCCESS,
	VENDOR_DELETE_SUCCESS,
	VENDOR_UPDATE_SUCCESS,
} from '../constants/VendorConstant';

export const fetchVendorReducer = (state = { vendors: [] }, action) => {
	switch (action.type) {
		case VENDOR_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case VENDOR_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case VENDOR_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				vendors: action.payload,
			};
		case VENDOR_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				vendors: state.vendors.map((vendor) =>
					vendor._id === action.payload.vendor._id ? action.payload.vendor : vendor,
				),
				verifiedMsg: action.payload.verifiedMsg,
			};
		case VENDOR_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				vendors: state.vendors.filter((vendor) => vendor._id !== action.payload),
			};
		case VENDOR_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				vendors: [...state.vendors, action.payload],
			};

		default:
			return state;
	}
};
