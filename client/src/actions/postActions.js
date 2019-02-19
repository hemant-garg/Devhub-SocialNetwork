import axios from "axios";
import {
	ADD_POST,
	GET_ERRORS,
	GET_POSTS,
	POST_LOADING,
	DELETE_POST,
	GET_POST,
	CLEAR_ERRORS
} from "./types.js";

// Add Post
export const addPost = data => dispatch => {
	dispatch(clearErrors());

	axios
		.post("/api/posts", data)
		.then(res =>
			dispatch({
				type: ADD_POST,
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

// Get all Posts
export const getPosts = () => dispatch => {
	dispatch(setPostLoading());
	axios
		.get("/api/posts")
		.then(res =>
			dispatch({
				type: GET_POSTS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_POSTS,
				payload: null
			})
		);
};

// Get Post by id
export const getPost = id => dispatch => {
	dispatch(setPostLoading());
	axios
		.get(`/api/posts/${id}`)
		.then(res =>
			dispatch({
				type: GET_POST,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_POST,
				payload: null
			})
		);
};

// Like Post
export const addLike = id => dispatch => {
	axios
		.post(`/api/posts/like/${id}`)
		.then(res => dispatch(getPosts()))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// UnLike Post
export const removeLike = id => dispatch => {
	axios
		.post(`/api/posts/unlike/${id}`)
		.then(res => dispatch(getPosts()))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Add Comment
export const addComment = (data, id) => dispatch => {
	dispatch(clearErrors());
	axios
		.post(`/api/posts/comment/${id}`, data)
		.then(res =>
			dispatch({
				type: GET_POST,
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

// delete Post
export const deletePost = id => dispatch => {
	axios
		.delete(`/api/posts/${id}`)
		.then(res =>
			dispatch({
				type: DELETE_POST,
				payload: id
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
	axios
		.delete(`/api/posts/comment/${postId}/${commentId}`)
		.then(res =>
			dispatch({
				type: GET_POST,
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

// set Loading state
export const setPostLoading = () => {
	return {
		type: POST_LOADING
	};
};

// clear errors
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};
