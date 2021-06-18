import axios from 'axios';
import {
	CARD_FETCH_REQUEST,
	CARD_FETCH_SUCCESS,
	CARD_FETCH_FAIL,
} from '../constants/CardConst';

export const fetchCardAction = () => async (dispatch) => {
	dispatch({
		type: CARD_FETCH_REQUEST,
	});

	try {
		const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/card`);

		dispatch({
			type: CARD_FETCH_SUCCESS,
			payload: data.cards,
		});
	} catch (err) {
		dispatch({
			type: CARD_FETCH_FAIL,
			payload: err,
		});
	}
};
