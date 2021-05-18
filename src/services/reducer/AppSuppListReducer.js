import { APPSUPPLIST_FETCH_FAIL, APPSUPPLIST_FETCH_REQUEST, APPSUPPLIST_FETCH_SUCCESS } from "../constants/AppSuppListConst";

export const fetchAppSuppListReducer = (
    state = { verifiedVendors: [] },
    action
) => {
    switch (action.type) {
        case APPSUPPLIST_FETCH_REQUEST:
            return { 
                loading: true,
            }
        case APPSUPPLIST_FETCH_SUCCESS:
            return { 
                loading: false,
                verifiedVendors: action.payload
            }
        case APPSUPPLIST_FETCH_FAIL:
            return { 
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}