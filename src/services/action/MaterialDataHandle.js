import axios from 'axios';
import 
    {
        MATERIAL_FETCH_FAIL,
        MATERIAL_FETCH_REQUEST,
        MATERIAL_FETCH_SUCCESS     
    } 
    from '../constants/MaterialConst';

export const getMaterialAction = () => async (dispatch) => {
    dispatch({
        type: MATERIAL_FETCH_REQUEST
    })
    
    try {
        const { data } = await axios.get('http://192.168.1.162:8000/api/material')
        
        dispatch({
            type: MATERIAL_FETCH_SUCCESS,
            payload: data,
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