import axios from 'axios';
import {
	SKILL_CREATE_SUCCESS,
	SKILL_DELETE_SUCCESS,
	SKILL_FAIL,
	SKILL_FETCH_SUCCESS,
	SKILL_REQUEST,
	SKILL_UPDATE_SUCCESS,
} from '../constants/SkillsConst';

export const getSkills = (query) => async (dispatch) => {
	dispatch({
		type: SKILL_REQUEST,
	});

	try {
		const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/skills`);

		console.log(data);

		dispatch({
			type: SKILL_FETCH_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const createSkill = (skill) => async (dispatch) => {
	dispatch({
		type: SKILL_REQUEST,
	});

	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/skills`,
			skill,
		);

		console.log(res);

		if (res.success || res.status === 200) {
			dispatch({
				type: SKILL_CREATE_SUCCESS,
				payload: res.data.skill,
			});
		}
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const updateSkill = (id, data) => async (dispatch) => {
	dispatch({
		type: SKILL_REQUEST,
	});

	try {
		const res = await axios.patch(
			`${process.env.REACT_APP_API_URL}/skills/${id}`,
			data,
		);

		dispatch({
			type: SKILL_UPDATE_SUCCESS,
			payload: res.data.skill,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

export const deleteSkill = (params) => async (dispatch) => {
	dispatch({
		type: SKILL_REQUEST,
	});

	try {
		await axios.delete(`${process.env.REACT_APP_API_URL}/skills/${params}`);

		dispatch({
			type: SKILL_DELETE_SUCCESS,
			payload: params,
		});

		// console.log(data);
	} catch (err) {
		dispatchError(err, dispatch);
	}
};

const dispatchError = (err, dispatch) => {
	if (err.response) {
		dispatch({
			type: SKILL_FAIL,
			payload: err.response.data.error,
		});
	} else {
		dispatch({
			type: SKILL_FAIL,
			payload: 'Network Error',
		});
	}
};
