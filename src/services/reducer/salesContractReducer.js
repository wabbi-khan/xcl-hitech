import {
	SALES_CONTRACT_CREATE_SUCCESS,
	SALES_CONTRACT_DELETE_SUCCESS,
	SALES_CONTRACT_FAIL,
	SALES_CONTRACT_FETCH_SUCCESS,
	SALES_CONTRACT_REQUEST,
	SALES_CONTRACT_UPDATE_SUCCESS,
} from '../constants/SalesContractConstant';

export const salesContractReducer = (
	state = { salesContracts: [] },
	action
) => {
	switch (action.type) {
		case SALES_CONTRACT_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case SALES_CONTRACT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case SALES_CONTRACT_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				salesContracts: action.payload,
			};
		case SALES_CONTRACT_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				salesContracts: state.salesContracts.map((salesContract) =>
					salesContract._id === action.payload._id
						? action.payload
						: salesContract
				),
			};
		case SALES_CONTRACT_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				salesContracts: state.salesContracts.filter(
					(salesContract) => salesContract._id !== action.payload
				),
			};
		case SALES_CONTRACT_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				salesContracts: [action.payload, ...state.salesContracts],
			};

		default:
			return state;
	}
};
