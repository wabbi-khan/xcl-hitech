import {
	PLAN_FETCH_FAIL,
	PLAN_FETCH_REQUEST,
	PLAN_FETCH_SUCCESS,
} from '../constants/PlanConstant';

export const fetchPlanReducer = (state = { plans: [] }, action) => {
	switch (action.type) {
		case PLAN_FETCH_REQUEST:
			return {
				loading: true,
			};
		case PLAN_FETCH_SUCCESS:
			return {
				loading: false,
				plans: action.payload,
			};
		case PLAN_FETCH_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
