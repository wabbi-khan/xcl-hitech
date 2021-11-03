import {
	BIN_CARD_FAIL,
	BIN_CARD_FETCH_SUCCESS,
	BIN_CARD_REQUEST,
} from '../constants/binCardConstant';

export const binCardReducer = (state = { binCards: [] }, action) => {
	switch (action.type) {
		case BIN_CARD_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case BIN_CARD_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case BIN_CARD_FETCH_SUCCESS:
			return {
				loading: false,
				error: '',
				binCards: action.payload,
			};

		default:
			return state;
	}
};
