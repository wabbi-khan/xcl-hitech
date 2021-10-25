import axios from 'axios';
import {
	SHIFT_FETCH_REQUEST,
	SHIFT_FETCH_SUCCESS,
	SHIFT_FETCH_FAIL,
} from '../constants/ShiftConstant';

export const fetchShiftAction = () => async (dispatch) => {
	dispatch({
		type: SHIFT_FETCH_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/shift`
		);

		dispatch({
			type: SHIFT_FETCH_SUCCESS,
			payload: data.shifts,
		});
	} catch (err) {
		dispatch({
			type: SHIFT_FETCH_FAIL,
			payload: err,
		});
	}
};
