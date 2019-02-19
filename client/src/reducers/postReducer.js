import {
	ADD_POST,
	POST_LOADING,
	GET_POSTS,
	GET_POST,
	DELETE_POST
} from "../actions/types";

const inititalState = {
	posts: [],
	post: {},
	loading: false
};

export default function(state = inititalState, action) {
	switch (action.type) {
		case POST_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false
			};

		case GET_POST:
			return {
				...state,
				post: action.payload,
				loading: false
			};

		case ADD_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts]
			};
		case DELETE_POST:
			const id = action.payload;
			return {
				...state,
				posts: state.posts.filter(post => post._id !== id)
			};
		default:
			return state;
	}
}
