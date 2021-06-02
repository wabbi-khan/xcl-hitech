import axios from 'axios';
import {
	DESIGNATION_FETCH_REQUEST,
	DESIGNATION_FETCH_SUCCESS,
	DESIGNATION_FETCH_FAIL,
} from '../constants/DesignationConst';

export const fetchDesignationAction = () => async (dispatch) => {
	dispatch({
		type: DESIGNATION_FETCH_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/designation`,
		);

		dispatch({
			type: DESIGNATION_FETCH_SUCCESS,
			payload: data.designations,
		});
	} catch (err) {
		dispatch({
			type: DESIGNATION_FETCH_FAIL,
			payload: err,
		});
	}
};
