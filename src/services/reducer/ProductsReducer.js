import { PRODUCTS_FETCH_FAIL, PRODUCTS_FETCH_REQUEST, PRODUCTS_FETCH_SUCCESS } from "../constants/ProductsConst";



export const fetchProductsReducer = (
    state = { products: [] },
    action
) => {
    switch (action.type) {
        case PRODUCTS_FETCH_REQUEST:
            return { 
                loading: true,
            }
        case PRODUCTS_FETCH_SUCCESS:
            return { 
                loading: false,
                products: action.payload
            }
        case PRODUCTS_FETCH_FAIL:
            return { 
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }
}