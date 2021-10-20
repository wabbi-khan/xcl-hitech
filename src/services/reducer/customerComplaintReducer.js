import {
	CUSTOMER_COMPLAINT_CREATE_SUCCESS,
	CUSTOMER_COMPLAINT_DELETE_SUCCESS,
	CUSTOMER_COMPLAINT_FAIL,
	CUSTOMER_COMPLAINT_FETCH_SUCCESS,
	CUSTOMER_COMPLAINT_REQUEST,
	CUSTOMER_COMPLAINT_UPDATE_SUCCESS,
} from '../constants/CustomerComplaintConstant';

export const customerComplaintReducer = (
	state = { customerComplaints: [] },
	action
) => {
	switch (action.type) {
		case CUSTOMER_COMPLAINT_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case CUSTOMER_COMPLAINT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case CUSTOMER_COMPLAINT_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				customerComplaints: action.payload,
			};
		case CUSTOMER_COMPLAINT_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				customerComplaints: state.customerComplaints.map(
					(customerComplaint) =>
						customerComplaint._id === action.payload._id
							? action.payload
							: customerComplaint
				),
			};
		case CUSTOMER_COMPLAINT_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				customerComplaints: state.customerComplaints.filter(
					(customerComplaint) => customerComplaint._id !== action.payload
				),
			};
		case CUSTOMER_COMPLAINT_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				customerComplaints: [action.payload, ...state.customerComplaints],
			};

		default:
			return state;
	}
};
