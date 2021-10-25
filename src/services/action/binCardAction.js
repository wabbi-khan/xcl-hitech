import axios from 'axios';
import {
	BIN_CARD_FAIL,
	BIN_CARD_FETCH_SUCCESS,
	BIN_CARD_REQUEST,
} from '../constants/binCardConstant';

export const getbinCards = (query, cb) => async (dispatch) => {
	dispatch({
		type: BIN_CARD_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/binCard`
		);

		if (data.success) {
			dispatch({
				type: BIN_CARD_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

const dispatchError = (err, dispatch, cb) => {
	if (err.response) {
		if (cb) cb(err.response.data.error);
		dispatch({
			type: BIN_CARD_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: BIN_CARD_FAIL,
			payload: 'Network Error',
		});
	}
};
