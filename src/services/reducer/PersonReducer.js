import {
	PERSON_FAIL,
	PERSON_REQUEST,
	PERSON_FETCH_SUCCESS,
} from '../constants/ContactPerson';

export const fetchPersonsReducer = (state = { persons: [] }, action) => {
	switch (action.type) {
		case PERSON_REQUEST:
			return {
				loading: true,
			};
		case PERSON_FETCH_SUCCESS:
			return {
				loading: false,
				persons: action.payload,
			};
		case PERSON_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
