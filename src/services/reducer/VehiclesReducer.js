import { 
    UNINSPECTED_VEHICLE_FETCH_FAIL,
        UNINSPECTED_VEHICLE_FETCH_REQUEST, 
        UNINSPECTED_VEHICLE_FETCH_SUCCESS, 
        VEHICLE_FETCH_FAIL, 
        VEHICLE_FETCH_REQUEST, 
        VEHICLE_FETCH_SUCCESS 
        } 
from "../constants/VehiclesConst";


export const fetchVehiclesReducer = (
    state = { vehicles: [] },
    action
) => {
    switch (action.type) {
        case VEHICLE_FETCH_REQUEST:
            return { 
                loading: true,
            }
        case VEHICLE_FETCH_SUCCESS:
            return { 
                loading: false,
                vehicles: action.payload
            }
        case VEHICLE_FETCH_FAIL:
            return { 
                loading: false,
                error: action.payload
            }
        case UNINSPECTED_VEHICLE_FETCH_REQUEST:
            return { 
                loading: true,
            }
        case UNINSPECTED_VEHICLE_FETCH_SUCCESS:
            return { 
                loading: false,
                vehicles: action.payload
            }
        case UNINSPECTED_VEHICLE_FETCH_FAIL:
            return { 
                loading: false,
                error: action.payload
            }
        
        default:
            return state;
    }
}