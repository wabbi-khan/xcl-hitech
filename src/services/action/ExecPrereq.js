import axios from 'axios';
import {
	EXECPREREQ_REQUEST,
	EXECPREREQ_FAIL,
	EXECPREREQ_FETCH_SUCCESS,
	EXECPREREQ_CREATE_SUCCESS,
	EXECPREREQ_UPDATE_SUCCESS,
	EXECPREREQ_DELETE_SUCCESS,
} from '../constants/ExecPrereq';

export const getExtEmpRequisitionAction = (query) => async (dispatch) => {
	dispatch({
		type: EXECPREREQ_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/executive-employees/requisition${
				query ? `?${query}` : ''
			}`,
		);

		console.log(data);

		dispatch({
			type: EXECPREREQ_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createExtEmpRequisitionAction =
	(requisition, cb) => async (dispatch) => {
		dispatch({
			type: EXECPREREQ_REQUEST,
		});
		try {
			const res = await axios.post(
				`${process.env.REACT_APP_API_URL}/executive-employees/requisition`,
				requisition,
			);

			console.log(res);

			dispatch({
				type: EXECPREREQ_CREATE_SUCCESS,
				payload: res.data.requisition,
			});

			if (cb) cb();
		} catch (err) {
			console.log('object');
			dispatchError(err, dispatch);
		}
	};

export const updateExtEmpRequisitionAction =
	(id, requisition, cb) => async (dispatch) => {
		dispatch({
			type: EXECPREREQ_REQUEST,
		});

		try {
			const res = await axios.patch(
				`${process.env.REACT_APP_API_URL}/executive-employees/requisition/${id}`,
				requisition,
			);

			console.log(res.data);

			dispatch({
				type: EXECPREREQ_UPDATE_SUCCESS,
				payload: { requisition: res.data.requisition },
			});

			if (cb) cb();
		} catch (err) {
			dispatchError(err, dispatch);
		}
	};

export const deleteExtEmpRequisitionAction = (id, cb) => async (dispatch) => {
	dispatch({
		type: EXECPREREQ_REQUEST,
	});

	try {
		const res = await axios.delete(
			`${process.env.REACT_APP_API_URL}/executive-employees/requisition/${id}`,
		);

		console.log(res.data);

		dispatch({
			type: EXECPREREQ_DELETE_SUCCESS,
			payload: id,
		});

		if (cb) cb();
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

const dispatchError = (err, dispatch) => {
	console.log(err);
	if (err.response) {
		console.log(err.response.data);
		dispatch({
			type: EXECPREREQ_FAIL,
			payload: err.response.data.error,
		});
	} else {
		dispatch({
			type: EXECPREREQ_FAIL,
			payload: 'Network Error',
		});
	}
};
