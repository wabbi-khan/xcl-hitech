import {
	PRODUCTION_REPORT_FETCH_FAIL,
	PRODUCTION_REPORT_FETCH_REQUEST,
	PRODUCTION_REPORT_FETCH_SUCCESS,
} from '../constants/ProductionReportConst';

export const fetchProductionReportReducer = (
	state = { productionReports: [] },
	action,
) => {
	switch (action.type) {
		case PRODUCTION_REPORT_FETCH_REQUEST:
			return {
				loading: true,
			};
		case PRODUCTION_REPORT_FETCH_SUCCESS:
			return {
				loading: false,
				productionReports: action.payload,
			};
		case PRODUCTION_REPORT_FETCH_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
