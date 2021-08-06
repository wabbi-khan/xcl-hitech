import {
	PERSON_CREATE_SUCCESS,
	PERSON_DELETE_SUCCESS,
	PERSON_FAIL,
	PERSON_FETCH_SUCCESS,
	PERSON_REQUEST,
	PERSON_UPDATE_SUCCESS,
} from '../constants/ContactPerson';

export const fetchPersons = (state = { persons: [] }, action) => {
	switch (action.type) {
		case PERSON_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case PERSON_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case PERSON_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				persons: action.payload,
			};
		case PERSON_UPDATE_SUCCESS:
			return {
				loading: false,
				error: '',
				persons: state.persons.map((person) =>
					person._id === action.payload._id ? action.payload : person,
				),
			};
		case PERSON_DELETE_SUCCESS:
			return {
				loading: false,
				error: '',
				persons: state.persons.filter((person) => person._id !== action.payload),
			};
		case PERSON_CREATE_SUCCESS:
			return {
				error: '',
				loading: false,
				persons: [action.payload, ...state.persons],
			};

		default:
			return state;
	}
};
