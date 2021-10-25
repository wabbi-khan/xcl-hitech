import axios from 'axios';
import {
	COMP_CRITERIA_FETCH_REQUEST,
	COMP_CRITERIA_FETCH_SUCCESS,
	COMP_CRITERIA_FETCH_FAIL,
} from '../constants/CriteriaConst';

export const fetchCompCriteriaAction = () => async (dispatch) => {
	dispatch({
		type: COMP_CRITERIA_FETCH_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/criteria`
		);

		dispatch({
			type: COMP_CRITERIA_FETCH_SUCCESS,
			payload: data.criteria,
		});
	} catch (err) {
		dispatch({
			type: COMP_CRITERIA_FETCH_FAIL,
			payload: err,
		});
	}
};
