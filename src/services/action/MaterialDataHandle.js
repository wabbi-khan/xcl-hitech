import axios from 'axios';
import 
    {
        MATERIAL_FETCH_FAIL,
        MATERIAL_FETCH_REQUEST,
        MATERIAL_FETCH_SUCCESS,     
        SPEC_CAT_MATERIAL_FETCH_FAIL,     
        SPEC_CAT_MATERIAL_FETCH_REQUEST,
        SPEC_CAT_MATERIAL_FETCH_SUCCESS
    } 
    from '../constants/MaterialConst';

export const getMaterialAction = () => async (dispatch) => {
    dispatch({
        type: MATERIAL_FETCH_REQUEST
    })
    
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/material`)
        
        dispatch({
            type: MATERIAL_FETCH_SUCCESS,
            payload: data.material,
        })

        // console.log(fetchApiData.data.material);
    }
    
    catch (err) {
        dispatch({
            type: MATERIAL_FETCH_FAIL,
            payload: err
        })

    }
}
export const getSpecCatMatAction = (_id) => async (dispatch) => {
    dispatch({
        type: SPEC_CAT_MATERIAL_FETCH_REQUEST
    })
    
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/material/${_id}`)

        console.log(data);
        
        dispatch({
            type: SPEC_CAT_MATERIAL_FETCH_SUCCESS,
            payload: data.materials,
        })

        // console.log(fetchApiData.data.material);
    }
    
    catch (err) {
        dispatch({
            type: SPEC_CAT_MATERIAL_FETCH_FAIL,
            payload: err
        })

    }
}