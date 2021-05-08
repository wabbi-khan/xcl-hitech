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