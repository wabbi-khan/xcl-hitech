import {
	JOB_DESCRIPTION_CREATE_SUCCESS,
	JOB_DESCRIPTION_DELETE_SUCCESS,
	JOB_DESCRIPTION_FAIL,
	JOB_DESCRIPTION_FETCH_SUCCESS,
	JOB_DESCRIPTION_REQUEST,
	JOB_DESCRIPTION_UPDATE_SUCCESS,
} from '../constants/JobDescriptionConst';

export const jobDescriptionReducer = (
	state = { jobDescriptions: [] },
	action,
) => {
	switch (action.type) {
		case JOB_DESCRIPTION_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case JOB_DESCRIPTION_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case JOB_DESCRIPTION_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				jobDescriptions: action.payload,
			};
		case JOB_DESCRIPTION_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				jobDescriptions: state.jobDescriptions.map((jobDescription) =>
					jobDescription._id === action.payload._id
						? action.payload
						: jobDescription,
				),
			};
		case JOB_DESCRIPTION_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				jobDescriptions: state.jobDescriptions.filter(
					(jobDescription) => jobDescription._id !== action.payload,
				),
			};
		case JOB_DESCRIPTION_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				jobDescriptions: [...state.jobDescriptions, action.payload],
			};

		default:
			return state;
	}
};
