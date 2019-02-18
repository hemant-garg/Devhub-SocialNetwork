import {
	PROFILE_LOADING,
	GET_PROFILE,
	CLEAR_CURRENT_PROFILE
} from "../actions/types";

const initialState = {
	profile: null,
	profiles: [],
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case PROFILE_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_PROFILE:
			// console.log(action.payload);
			return {
				...state,
				profile: action.payload,
				loading: false
			};
		case CLEAR_CURRENT_PROFILE:
			return {
				...state,
				profile: null
			};
		default:
			return state;
	}
}
