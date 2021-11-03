import axios from 'axios';
import {
	APPSUPPLIST_FETCH_REQUEST,
	APPSUPPLIST_FETCH_SUCCESS,
	APPSUPPLIST_FETCH_FAIL,
} from '../constants/AppSuppListConst';

export const appSuppListAction = () => async (dispatch) => {
	dispatch({
		type: APPSUPPLIST_FETCH_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/vendor/verified`
		);

		dispatch({
			type: APPSUPPLIST_FETCH_SUCCESS,
			payload: data.vendor,
		});
	} catch (err) {
		dispatch({
			type: APPSUPPLIST_FETCH_FAIL,
			payload: err,
		});
	}
};
