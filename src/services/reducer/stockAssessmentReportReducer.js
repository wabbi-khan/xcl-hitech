import {
    STOCK_ASSESSMENT_REPORT_CREATE_SUCCESS,
    STOCK_ASSESSMENT_REPORT_DELETE_SUCCESS,
    STOCK_ASSESSMENT_REPORT_FAIL,
    STOCK_ASSESSMENT_REPORT_FETCH_SUCCESS,
    STOCK_ASSESSMENT_REPORT_REQUEST,
    STOCK_ASSESSMENT_REPORT_UPDATE_SUCCESS,
} from '../constants/StockAssessmentReportConstant';

export const stockAssessmentReportReducer = (
    state = { stockAssessmentReports: [] },
    action,
) => {
    switch (action.type) {
        case STOCK_ASSESSMENT_REPORT_REQUEST:
            return {
                ...state,
                error: '',
                loading: true,
            };
        case STOCK_ASSESSMENT_REPORT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case STOCK_ASSESSMENT_REPORT_FETCH_SUCCESS:
            return {
                loading: false,
                error: '',
                stockAssessmentReports: action.payload,
            };
        case STOCK_ASSESSMENT_REPORT_UPDATE_SUCCESS:
            return {
                loading: false,
                error: '',
                stockAssessmentReports: state.stockAssessmentReports.map((stockAssessmentReport) =>
                    stockAssessmentReport._id === action.payload._id ?
                    action.payload :
                    stockAssessmentReport,
                ),
            };
        case STOCK_ASSESSMENT_REPORT_DELETE_SUCCESS:
            return {
                loading: false,
                error: '',
                stockAssessmentReports: state.stockAssessmentReports.filter(
                    (stockAssessmentReport) => stockAssessmentReport._id !== action.payload,
                ),
            };
        case STOCK_ASSESSMENT_REPORT_CREATE_SUCCESS:
            return {
                error: '',
                loading: false,
                stockAssessmentReports: [action.payload, ...state.stockAssessmentReports],
            };

        default:
            return state;
    }
};