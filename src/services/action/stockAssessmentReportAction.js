import axios from 'axios';
import {
	STOCK_ASSESSMENT_REPORT_CREATE_SUCCESS,
	STOCK_ASSESSMENT_REPORT_DELETE_SUCCESS,
	STOCK_ASSESSMENT_REPORT_FAIL,
	STOCK_ASSESSMENT_REPORT_FETCH_SUCCESS,
	STOCK_ASSESSMENT_REPORT_REQUEST,
	STOCK_ASSESSMENT_REPORT_UPDATE_SUCCESS,
} from '../constants/StockAssessmentReportConstant';

export const getStockAssessmentReports = (query, cb) => async (dispatch) => {
	dispatch({
		type: STOCK_ASSESSMENT_REPORT_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/stockAssessmentReport`
		);

		if (data.success) {
			dispatch({
				type: STOCK_ASSESSMENT_REPORT_FETCH_SUCCESS,
				payload: data.data,
			});
			if (cb) cb();
		}
	} catch (err) {
		dispatchError(err, dispatch, cb);
	}
};

export const createStockAssessmentReports =
	(values, cb) => async (dispatch) => {
		dispatch({
			type: STOCK_ASSESSMENT_REPORT_REQUEST,
		});

		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_API_URL}/stockAssessmentReport`,
				values
			);

			if (data.success) {
				dispatch({
					type: STOCK_ASSESSMENT_REPORT_CREATE_SUCCESS,
					payload: data.stockAssessmentReport,
				});
				if (cb) cb();
			}
		} catch (err) {
			dispatchError(err, dispatch, cb);
		}
	};

export const updateStockAssessmentReports =
	(id, values, cb) => async (dispatch) => {
		dispatch({
			type: STOCK_ASSESSMENT_REPORT_REQUEST,
		});

		try {
			const { data } = await axios.patch(
				`${process.env.REACT_APP_API_URL}/stockAssessmentReport/${id}`,
				values
			);

			if (data.success) {
				dispatch({
					type: STOCK_ASSESSMENT_REPORT_UPDATE_SUCCESS,
					payload: data.stockAssessmentReport,
				});
				if (cb) cb();
			}
		} catch (err) {
			dispatchError(err, dispatch, cb);
		}
	};

export const deleteStockAssessmentReports =
	(params, cb) => async (dispatch) => {
		dispatch({
			type: STOCK_ASSESSMENT_REPORT_REQUEST,
		});

		try {
			const { data } = await axios.delete(
				`${process.env.REACT_APP_API_URL}/stockAssessmentReport/${params}`
			);

			if (data.success) {
				dispatch({
					type: STOCK_ASSESSMENT_REPORT_DELETE_SUCCESS,
					payload: params,
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
			type: STOCK_ASSESSMENT_REPORT_FAIL,
			payload: err.response.data.error,
		});
	} else {
		if (cb) cb('Network Error');
		dispatch({
			type: STOCK_ASSESSMENT_REPORT_FAIL,
			payload: 'Network Error',
		});
	}
};
