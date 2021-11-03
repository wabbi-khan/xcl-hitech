import {
	ATTENDANCE_FAIL,
	ATTENDANCE_REQUEST,
	ATTENDANCE_FETCH_SUCCESS,
	ATTENDANCE_CREATE_SUCCESS,
	ATTENDANCE_DELETE_SUCCESS,
	ATTENDANCE_UPDATE_SUCCESS,
} from '../constants/attendanceConstant';

export const fetchAttendanceReducer = (
	state = { attendances: [], error: '' },
	action
) => {
	switch (action.type) {
		case ATTENDANCE_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case ATTENDANCE_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case ATTENDANCE_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				attendances: action.payload,
			};
		case ATTENDANCE_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				attendances: state.attendances.map((attendance) =>
					attendance._id === action.payload.attendance._id
						? action.payload.attendance
						: attendance
				),
			};
		case ATTENDANCE_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				attendances: state.attendances.filter(
					(attendance) => attendance._id !== action.payload
				),
			};
		case ATTENDANCE_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				attendances: [...state.attendances, ...action.payload],
			};

		default:
			return state;
	}
};
