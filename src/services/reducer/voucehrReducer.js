import {
	VOUCHER_CREATE_SUCCESS,
	VOUCHER_DELETE_SUCCESS,
	VOUCHER_FAIL,
	VOUCHER_FETCH_SUCCESS,
	VOUCHER_REQUEST,
	VOUCHER_UPDATE_SUCCESS,
} from '../constants/VoucherConstans';

export const voucherReducer = (state = { vouchers: [] }, action) => {
	switch (action.type) {
		case VOUCHER_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case VOUCHER_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case VOUCHER_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				vouchers: action.payload,
			};
		case VOUCHER_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				vouchers: state.vouchers.map((voucher) =>
					voucher._id === action.payload._id ? action.payload : voucher
				),
			};
		case VOUCHER_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				vouchers: state.vouchers.filter(
					(voucher) => voucher._id !== action.payload
				),
			};
		case VOUCHER_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				vouchers: [...state.vouchers, action.payload],
			};

		default:
			return state;
	}
};
