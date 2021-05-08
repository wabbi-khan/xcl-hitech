import axios from 'axios';
import { CATEGORY_FETCH_FAIL, CATEGORY_FETCH_REQUEST, CATEGORY_FETCH_SUCCESS } from '../constants/MatCategoryConst';

export const getMaterialCategoryAction = () => async (dispatch) => {
    dispatch({
        type: CATEGORY_FETCH_REQUEST
    })
    
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/category`)
        console.log(data);

        dispatch({
            type: CATEGORY_FETCH_SUCCESS,
            payload: data.category,
        })

        // console.log(fetchApiData.data.material);
    }
    
    catch (err) {
        dispatch({
            type: CATEGORY_FETCH_FAIL,
            payload: err
        })

    }
}