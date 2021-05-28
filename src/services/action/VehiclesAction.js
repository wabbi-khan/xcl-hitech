import axios from 'axios';
import {
    VEHICLE_FETCH_FAIL,
    VEHICLE_FETCH_REQUEST,
    VEHICLE_FETCH_SUCCESS
}
    from '../constants/VehiclesConst';

export const fetchVehiclesAction = () => async (dispatch) => {
    dispatch({
        type: VEHICLE_FETCH_REQUEST
    })

    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/vehicle`)

        dispatch({
            type: VEHICLE_FETCH_SUCCESS,
            payload: data.vehicles
        })

    }

    catch (err) {
        dispatch({
            type: VEHICLE_FETCH_FAIL,
            payload: err
        })

    }
}