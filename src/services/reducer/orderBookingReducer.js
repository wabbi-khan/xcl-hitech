import {
    ORDER_BOOKING_CREATE_SUCCESS,
    ORDER_BOOKING_DELETE_SUCCESS,
    ORDER_BOOKING_FAIL,
    ORDER_BOOKING_FETCH_SUCCESS,
    ORDER_BOOKING_REQUEST,
    ORDER_BOOKING_UPDATE_SUCCESS,
} from '../constants/OrderBookingConstant';

export const orderBookingReducer = (
    state = { orderBookings: [] },
    action,
) => {
    switch (action.type) {
        case ORDER_BOOKING_REQUEST:
            return {
                ...state,
                error: '',
                loading: true,
            };
        case ORDER_BOOKING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ORDER_BOOKING_FETCH_SUCCESS:
            return {
                loading: false,
                error: '',
                orderBookings: action.payload,
            };
        case ORDER_BOOKING_UPDATE_SUCCESS:
            return {
                loading: false,
                error: '',
                orderBookings: state.orderBookings.map((orderBooking) =>
                    orderBooking._id === action.payload._id ?
                    action.payload :
                    orderBooking,
                ),
            };
        case ORDER_BOOKING_DELETE_SUCCESS:
            return {
                loading: false,
                error: '',
                orderBookings: state.orderBookings.filter(
                    (orderBooking) => orderBooking._id !== action.payload,
                ),
            };
        case ORDER_BOOKING_CREATE_SUCCESS:
            return {
                error: '',
                loading: false,
                orderBookings: [action.payload, ...state.orderBookings],
            };

        default:
            return state;
    }
};