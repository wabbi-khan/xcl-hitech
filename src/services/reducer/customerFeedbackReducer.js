import {
	CUSTOMER_FEEDBACK_CREATE_SUCCESS,
	CUSTOMER_FEEDBACK_DELETE_SUCCESS,
	CUSTOMER_FEEDBACK_FAIL,
	CUSTOMER_FEEDBACK_FETCH_SUCCESS,
	CUSTOMER_FEEDBACK_REQUEST,
	CUSTOMER_FEEDBACK_UPDATE_SUCCESS,
} from '../constants/CustomerFeedbackConstant';

export const customerFeedbackReducer = (
	state = { customerFeedbacks: [] },
	action
) => {
	switch (action.type) {
		case CUSTOMER_FEEDBACK_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case CUSTOMER_FEEDBACK_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case CUSTOMER_FEEDBACK_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				customerFeedbacks: action.payload,
			};
		case CUSTOMER_FEEDBACK_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				customerFeedbacks: state.customerFeedbacks.map((customerFeedback) =>
					customerFeedback._id === action.payload._id
						? action.payload
						: customerFeedback
				),
			};
		case CUSTOMER_FEEDBACK_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				customerFeedbacks: state.customerFeedbacks.filter(
					(customerFeedback) => customerFeedback._id !== action.payload
				),
			};
		case CUSTOMER_FEEDBACK_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				customerFeedbacks: [action.payload, ...state.customerFeedbacks],
			};

		default:
			return state;
	}
};
