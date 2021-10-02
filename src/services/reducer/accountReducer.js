import {
    ACCOUNT_CREATE_SUCCESS,
    ACCOUNT_DELETE_SUCCESS,
    ACCOUNT_FAIL,
    ACCOUNT_FETCH_SUCCESS,
    ACCOUNT_REQUEST,
    ACCOUNT_UPDATE_SUCCESS,
} from '../constants/AccountConstant';

export const accountReducer = (
    state = { accounts: [] },
    action,
) => {
    switch (action.type) {
        case ACCOUNT_REQUEST:
            return {
                ...state,
                error: '',
                loading: true,
            };
        case ACCOUNT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ACCOUNT_FETCH_SUCCESS:
            return {
                loading: false,
                error: '',
                accounts: action.payload,
            };
        case ACCOUNT_UPDATE_SUCCESS:
            return {
                loading: false,
                error: '',
                accounts: state.accounts.map((account) =>
                    account._id === action.payload._id ?
                    action.payload :
                    account,
                ),
            };
        case ACCOUNT_DELETE_SUCCESS:
            return {
                loading: false,
                error: '',
                accounts: state.accounts.filter(
                    (account) => account._id !== action.payload,
                ),
            };
        case ACCOUNT_CREATE_SUCCESS:
            return {
                error: '',
                loading: false,
                accounts: [...state.accounts, action.payload],
            };

        default:
            return state;
    }
};