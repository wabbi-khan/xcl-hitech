import {
	TRAININGNEEDIDENTIFICATION_CREATE_SUCCESS,
	TRAININGNEEDIDENTIFICATION_DELETE_SUCCESS,
	TRAININGNEEDIDENTIFICATION_FAIL,
	TRAININGNEEDIDENTIFICATION_FETCH_SUCCESS,
	TRAININGNEEDIDENTIFICATION_REQUEST,
	TRAININGNEEDIDENTIFICATION_UPDATE_SUCCESS,
} from '../constants/TrainingNeedIdentificationConstant';

export const getTrainingsIdentification = (
	state = { identifications: [] },
	action,
) => {
	switch (action.type) {
		case TRAININGNEEDIDENTIFICATION_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case TRAININGNEEDIDENTIFICATION_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case TRAININGNEEDIDENTIFICATION_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				identifications: action.payload,
			};
		case TRAININGNEEDIDENTIFICATION_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				identifications: state.identifications.map((identification) =>
					identification._id === action.payload._id
						? action.payload
						: identification,
				),
			};
		case TRAININGNEEDIDENTIFICATION_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				identifications: state.identifications.filter(
					(identification) => identification._id !== action.payload,
				),
			};
		case TRAININGNEEDIDENTIFICATION_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				identifications: [...state.identifications, action.payload],
			};

		default:
			return state;
	}
};
