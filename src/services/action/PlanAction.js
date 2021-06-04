import axios from 'axios';
import {
	PLAN_FETCH_REQUEST,
	PLAN_FETCH_SUCCESS,
	PLAN_FETCH_FAIL,
} from '../constants/PlanConstant';

export const fetchPlanAction = () => async (dispatch) => {
	dispatch({
		type: PLAN_FETCH_REQUEST,
	});

	try {
		const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/plan`);

		dispatch({
			type: PLAN_FETCH_SUCCESS,
			payload: data.plans,
		});
	} catch (err) {
		dispatch({
			type: PLAN_FETCH_FAIL,
			payload: err,
		});
	}
};
