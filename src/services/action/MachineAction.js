import axios from 'axios';
import {
	MACHINE_FETCH_REQUEST,
	MACHINE_FETCH_SUCCESS,
	MACHINE_FETCH_FAIL,
} from '../constants/MachineConst';

export const fetchMachineAction = () => async (dispatch) => {
	dispatch({
		type: MACHINE_FETCH_REQUEST,
	});

	try {
		const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/machine`);

		dispatch({
			type: MACHINE_FETCH_SUCCESS,
			payload: data.machines,
		});
	} catch (err) {
		dispatch({
			type: MACHINE_FETCH_FAIL,
			payload: err,
		});
	}
};
