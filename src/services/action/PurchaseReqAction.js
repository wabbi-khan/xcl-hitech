import axios from 'axios';
import {
	PURCHASE_REQ_FAIL,
	PURCHASE_REQ_REQUEST,
	PURCHASE_REQ_FETCH_SUCCESS,
	PURCHASE_REQ_CREATE_SUCCESS,
	PURCHASE_REQ_UPDATE_SUCCESS,
} from '../constants/PurchaseReqConst';

export const fetchRequisitionAction = (query, cb) => async (dispatch) => {
	dispatch({
		type: PURCHASE_REQ_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/request${query ? `?${query}` : ''}`
		);

		if (data.success) {
			dispatch({
				type: PURCHASE_REQ_FETCH_SUCCESS,
				payload: data.data,
			});

			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const fetchSingleRequisitionAction = (id) => async (dispatch) => {
	dispatch({
		type: PURCHASE_REQ_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/request/${id}`
		);

		dispatch({
			type: PURCHASE_REQ_FETCH_SUCCESS,
			payload: data.request,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createPurchaseReqAction = (values, cb) => async (dispatch) => {
	dispatch({
		type: PURCHASE_REQ_REQUEST,
	});

	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/request`,
			values
		);

		if (data.success) {
			dispatch({
				type: PURCHASE_REQ_CREATE_SUCCESS,
				payload: data.request,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const updatePurchaseReqAction = (id, values, cb) => async (dispatch) => {
	dispatch({
		type: PURCHASE_REQ_REQUEST,
	});

	try {
		const { data } = await axios.patch(
			`${process.env.REACT_APP_API_URL}/request/${id}`,
			values
		);

		if (data.success) {
			dispatch({
				type: PURCHASE_REQ_UPDATE_SUCCESS,
				payload: data.request,
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
			type: PURCHASE_REQ_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: PURCHASE_REQ_FAIL,
			payload: 'Network Error',
		});
	}
};

// export const fetchCompletePurchaseReqAction = () => async (dispatch) => {
//     dispatch({
//         type: COMPLETE_PURCHASE_REQ_FETCH_REQUEST
//     })

//     try {
//         const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/product`)

//         dispatch({
//             type: COMPLETE_PURCHASE_REQ_FETCH_SUCCESS,
//             payload: data.products
//         })

//     }

//     catch (err) {
//         dispatch({
//             type: COMPLETE_PURCHASE_REQ_FETCH_FAIL,
//             payload: err
//         })

//     }
// }
