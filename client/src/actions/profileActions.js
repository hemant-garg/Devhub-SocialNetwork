import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

import {
	PROFILE_LOADING,
	GET_PROFILE,
	GET_PROFILES,
	CLEAR_CURRENT_PROFILE,
	GET_ERRORS,
	SET_CURRENT_USER,
	CLEAR_ERRORS
} from "./types";

// GET all Profile
export const getProfiles = () => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get("/api/profile/all")
		.then(res =>
			dispatch({
				type: GET_PROFILES,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PROFILES,
				payload: null
			})
		);
};

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

// GET Profile by handle
export const getProfileByHandle = handle => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get(`/api/profile/handle/${handle}`)
		.then(res =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch(err =>
			// dispatch({
			// 	type: GET_PROFILE,
			// 	payload: {}
			// })
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// create Profile
export const createProfile = (data, history) => dispatch => {
	dispatch(clearErrors());
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
	dispatch(clearErrors());

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
	dispatch(clearErrors());

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

// clear errors
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};
