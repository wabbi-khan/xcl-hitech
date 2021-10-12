import {
	CONTRACT_REVIEW_CREATE_SUCCESS,
	CONTRACT_REVIEW_DELETE_SUCCESS,
	CONTRACT_REVIEW_FAIL,
	CONTRACT_REVIEW_FETCH_SUCCESS,
	CONTRACT_REVIEW_REQUEST,
	CONTRACT_REVIEW_UPDATE_SUCCESS,
} from '../constants/ContractReviewConstant';

export const contractReviewReducer = (
	state = { contractReviews: [] },
	action
) => {
	switch (action.type) {
		case CONTRACT_REVIEW_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case CONTRACT_REVIEW_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case CONTRACT_REVIEW_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				contractReviews: action.payload,
			};
		case CONTRACT_REVIEW_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				contractReviews: state.contractReviews.map((contractReview) =>
					contractReview._id === action.payload._id
						? action.payload
						: contractReview
				),
			};
		case CONTRACT_REVIEW_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				contractReviews: state.contractReviews.filter(
					(contractReview) => contractReview._id !== action.payload
				),
			};
		case CONTRACT_REVIEW_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				contractReviews: [action.payload, ...state.contractReviews],
			};

		default:
			return state;
	}
};
