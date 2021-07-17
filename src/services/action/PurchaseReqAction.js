import axios from 'axios';
import {
	PURCHASE_REQ_FAIL,
	PURCHASE_REQ_REQUEST,
	PURCHASE_REQ_FETCH_SUCCESS,
	PURCHASE_REQ_CREATE_SUCCESS,
	PURCHASE_REQ_UPDATE_SUCCESS,
} from '../constants/PurchaseReqConst';

export const fetchRequisitionAction = (query) => async (dispatch) => {
	dispatch({
		type: PURCHASE_REQ_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/request${query ? `?${query}` : ''}`,
		);
		// console.log(data);

		dispatch({
			type: PURCHASE_REQ_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const fetchSingleRequisitionAction = (id) => async (dispatch) => {
	dispatch({
		type: PURCHASE_REQ_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/request/${id}`,
		);
		console.log(data.request);

		dispatch({
			type: PURCHASE_REQ_FETCH_SUCCESS,
			payload: data.request,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createPurchaseReqAction = (data) => async (dispatch) => {
	dispatch({
		type: PURCHASE_REQ_REQUEST,
	});

	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/request`,
			data,
		);

		dispatch({
			type: PURCHASE_REQ_CREATE_SUCCESS,
			payload: res.data.request,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const updatePurchaseReqAction = (id, data) => async (dispatch) => {
	dispatch({
		type: PURCHASE_REQ_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/request/${id}`,
			data,
		);

		console.log(res.data.request);

		dispatch({
			type: PURCHASE_REQ_UPDATE_SUCCESS,
			payload: res.data.request,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

const dispatchError = (err, dispatch) => {
	if (err.response) {
		console.log(err.response.data.error);
		dispatch({
			type: PURCHASE_REQ_FAIL,
			payload: err.response.data.error,
		});
	} else {
		console.log(err);
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
//         console.log(data);

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
