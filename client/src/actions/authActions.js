import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

export const registerUser = (data, history) => dispatch => {
	axios
		.post("/api/users/register", data)
		.then(res => history.push("/login"))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const loginUser = data => dispatch => {
	axios
		.post("/api/users/login", data)
		.then(res => {
			// take a token as response
			const { token } = res.data;

			// set token to local storage
			localStorage.setItem("jwtToken", token);

			// set token to auth header
			setAuthToken(token);

			// decode token to get user data
			const decoded = jwt_decode(token);

			// set Current user
			dispatch(setCurrentUser(decoded));
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// set logged in user
export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

// log out user
export const logoutUser = () => dispatch => {
	// remove token from local storage
	localStorage.removeItem("jwtToken");

	// remove authorization header
	setAuthToken(false);

	// remove user
	dispatch(setCurrentUser({}));
};
