import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

export default function(state = {}, action) {
	switch (action.type) {
		case GET_ERRORS:
			return action.payload;
		case CLEAR_ERRORS:
			return {};
		default:
			return state;
	}
}
