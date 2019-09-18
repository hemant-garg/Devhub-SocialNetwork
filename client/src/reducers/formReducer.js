import {
	SET_BIO_FORM_STATE,
	SET_EDU_FORM_STATE,
	SET_EXP_FORM_STATE,
	SET_SKILLS_FORM_STATE,
	SET_SOCIAL_FORM_STATE
} from "../actions/types";
// import isEmpty from "../validation/isEmpty";

const initialState = {
	social: false,
	bio: false,
	skills: false,
	edu: false,
	exp: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_EXP_FORM_STATE:
			return {
				...state,
				exp: action.payload
			};
		case SET_EDU_FORM_STATE:
			return {
				...state,
				edu: action.payload
			};
		case SET_SOCIAL_FORM_STATE:
			return {
				...state,
				social: action.payload
			};
		case SET_BIO_FORM_STATE:
			return {
				...state,
				bio: action.payload
			};
		case SET_SKILLS_FORM_STATE:
			return {
				...state,
				skills: action.payload
			};
		default:
			return state;
	}
}
