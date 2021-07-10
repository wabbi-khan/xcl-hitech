import {
	TRAININGATTENDANCE_CREATE_SUCCESS,
	TRAININGATTENDANCE_DELETE_SUCCESS,
	TRAININGATTENDANCE_FAIL,
	TRAININGATTENDANCE_FETCH_SUCCESS,
	TRAININGATTENDANCE_REQUEST,
	TRAININGATTENDANCE_UPDATE_SUCCESS,
} from '../constants/TrainingAttendance';

export const getTrainingsAttendance = (state = { attendance: [] }, action) => {
	switch (action.type) {
		case TRAININGATTENDANCE_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case TRAININGATTENDANCE_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case TRAININGATTENDANCE_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				attendance: action.payload,
			};
		case TRAININGATTENDANCE_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				attendance: state.attendance.map((attendance) =>
					attendance._id === action.payload._id ? action.payload : attendance,
				),
			};
		case TRAININGATTENDANCE_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				attendance: state.attendance.filter(
					(attendance) => attendance._id !== action.payload,
				),
			};
		case TRAININGATTENDANCE_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				attendance: action.payload,
			};

		default:
			return state;
	}
};
