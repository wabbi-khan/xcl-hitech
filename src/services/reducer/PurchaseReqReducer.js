import { 
    REQ_FETCH_FAIL,
    REQ_FETCH_REQUEST, 
    REQ_FETCH_SUCCESS,
    SINGLE_REQ_FETCH_FAIL,
    SINGLE_REQ_FETCH_REQUEST,
    SINGLE_REQ_FETCH_SUCCESS, 
} 
from "../constants/PurchaseReqConst";


export const fetchReqReducer = (
    state = { requests: [] },
    action
) => {
    switch (action.type) {
        case REQ_FETCH_REQUEST:
            return { 
                loading: true,
            }
        case REQ_FETCH_SUCCESS:
            return { 
                loading: false,
                requests: action.payload
            }
        case REQ_FETCH_FAIL:
            return { 
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }
}

export const fetchSingleReqReducer = (
    state = { request: [] },
    action
) => {
    switch (action.type) {
        case SINGLE_REQ_FETCH_REQUEST:
            return { 
                loading: true,
            }
        case SINGLE_REQ_FETCH_SUCCESS:
            return { 
                loading: false,
                request: action.payload
            }
        case SINGLE_REQ_FETCH_FAIL:
            return { 
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }
}


// export const fetchCompletePurchaseReqReducer = (
//     state = { products: [] },
//     action
// ) => {
//     switch (action.type) {
//         case COMPLETE_PURCHASE_REQ_FETCH_REQUEST:
//             return { 
//                 loading: true,
//             }
//         case COMPLETE_PURCHASE_REQ_FETCH_SUCCESS:
//             return { 
//                 loading: false,
//                 products: action.payload
//             }
//         case COMPLETE_PURCHASE_REQ_FETCH_FAIL:
//             return { 
//                 loading: false,
//                 error: action.payload
//             }
    
//         default:
//             return state;
//     }
// }