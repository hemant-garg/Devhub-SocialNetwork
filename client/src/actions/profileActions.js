import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

import {
	PROFILE_LOADING,
	GET_PROFILE,
	CLEAR_CURRENT_PROFILE,
	GET_ERRORS,
	SET_CURRENT_USER
} from "./types";

// GET Current Profile
export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get("/api/profile")
		.then(res =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PROFILE,
				payload: {}
			})
		);
};

// create Profile
export const createProfile = (data, history) => dispatch => {
	axios
		.post("/api/profile", data)
		.then(res => history.push("/dashboard"))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// delete account
export const deleteAccount = () => dispatch => {
	if (window.confirm("Are you sure? This CANNOT be undone once deleted")) {
		axios
			.delete("/api/profile")
			.then(res => {
				localStorage.removeItem("jwtToken");
				setAuthToken(false);
				dispatch({
					type: SET_CURRENT_USER,
					payload: {}
				});
			})
			.catch(err =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				})
			);
	}
};

// add Experience
export const addExperience = (data, history) => dispatch => {
	axios
		.post("/api/profile/experience", data)
		.then(res => history.push("/dashboard"))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// add education
export const addEducation = (data, history) => dispatch => {
	axios
		.post("/api/profile/education", data)
		.then(res => history.push("/dashboard"))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// delete experience
export const deleteExperience = id => dispatch => {
	axios
		.delete(`/api/profile/experience/${id}`)
		.then(res =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// delete education
export const deleteEducation = id => dispatch => {
	axios
		.delete(`/api/profile/education/${id}`)
		.then(res =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// set loading
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING
	};
};

// Clear Profile
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	};
};
