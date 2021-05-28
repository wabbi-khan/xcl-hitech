import { INSPECTED_ORDER_FETCH_FAIL, INSPECTED_ORDER_FETCH_REQUEST, INSPECTED_ORDER_FETCH_SUCCESS, PURCHASE_ORDER_FETCH_FAIL, 
    PURCHASE_ORDER_FETCH_REQUEST, 
    PURCHASE_ORDER_FETCH_SUCCESS, 
    SINGLE_PURCHASE_ORDER_FETCH_FAIL, 
    SINGLE_PURCHASE_ORDER_FETCH_REQUEST,
    SINGLE_PURCHASE_ORDER_FETCH_SUCCESS
} 
from "../constants/OrderConstant";


export const fetchPurchaseOrderReducer = (
    state = { orders: [] },
    action
) => {
    switch (action.type) {
        case PURCHASE_ORDER_FETCH_REQUEST:
            return { 
                loading: true,
            }
        case PURCHASE_ORDER_FETCH_SUCCESS:
            return { 
                loading: false,
                orders: action.payload
            }
        case PURCHASE_ORDER_FETCH_FAIL:
            return { 
                loading: false,
                error: action.payload
            }
        case INSPECTED_ORDER_FETCH_REQUEST:
            return { 
                loading: true,
            }
        case INSPECTED_ORDER_FETCH_SUCCESS:
            return { 
                loading: false,
                orders: action.payload
            }
        case INSPECTED_ORDER_FETCH_FAIL:
            return { 
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }
}

export const fetchSinglePurchaseOrderReducer = (
    state = { order: [] },
    action
) => {
    switch (action.type) {
        case SINGLE_PURCHASE_ORDER_FETCH_REQUEST:
            return { 
                loading: true,
            }
        case SINGLE_PURCHASE_ORDER_FETCH_SUCCESS:
            return { 
                loading: false,
                order: action.payload
            }
        case SINGLE_PURCHASE_ORDER_FETCH_FAIL:
            return { 
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }
}