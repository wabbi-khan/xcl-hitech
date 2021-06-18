import {
	CARD_FETCH_FAIL,
	CARD_FETCH_REQUEST,
	CARD_FETCH_SUCCESS,
} from '../constants/CardConst';

export const fetchCardReducer = (state = { cards: [] }, action) => {
	switch (action.type) {
		case CARD_FETCH_REQUEST:
			return {
				loading: true,
			};
		case CARD_FETCH_SUCCESS:
			return {
				loading: false,
				cards: action.payload,
			};
		case CARD_FETCH_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
