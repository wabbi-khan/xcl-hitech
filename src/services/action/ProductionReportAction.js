import axios from 'axios';
import {
	PRODUCTION_REPORT_FETCH_REQUEST,
	PRODUCTION_REPORT_FETCH_SUCCESS,
	PRODUCTION_REPORT_FETCH_FAIL,
} from '../constants/ProductionReportConst';

export const fetchProductionReport = () => async (dispatch) => {
	dispatch({
		type: PRODUCTION_REPORT_FETCH_REQUEST,
	});

	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_URL}/productionReport`,
		);

		dispatch({
			type: PRODUCTION_REPORT_FETCH_SUCCESS,
			payload: data.productionReport,
		});
	} catch (err) {
		dispatch({
			type: PRODUCTION_REPORT_FETCH_FAIL,
			payload: err,
		});
	}
};
