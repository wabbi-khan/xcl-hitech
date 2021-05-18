import { NON_VERIFY_VENDOR_FETCH_FAIL, NON_VERIFY_VENDOR_FETCH_REQUEST, NON_VERIFY_VENDOR_FETCH_SUCCESS, VENDOR_FETCH_FAIL, VENDOR_FETCH_REQUEST, VENDOR_FETCH_SUCCESS } from "../constants/VendorConstant";

export const fetchVendorReducer = (
    state = { vendors: [] },
    action
) => {
    switch (action.type) {
        case VENDOR_FETCH_REQUEST:
            return { 
                loading: true,
            }
        case VENDOR_FETCH_SUCCESS:
            return { 
                loading: false,
                vendors: action.payload
            }
        case VENDOR_FETCH_FAIL:
            return { 
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }
}

export const fetchNonVerifiedVendorReducer = (
    state = { nonVerifiedVendors: [] },
    action
) => {
    switch (action.type) {
        case NON_VERIFY_VENDOR_FETCH_REQUEST:
            return { 
                loading: true,
            }
        case NON_VERIFY_VENDOR_FETCH_SUCCESS:
            return { 
                loading: false,
                vendors: action.payload
            }
        case NON_VERIFY_VENDOR_FETCH_FAIL:
            return { 
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }
}