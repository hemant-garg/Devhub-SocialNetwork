import React from "react";
import { withRouter } from "react-router-dom";

const NotFound = props => {
	return (
		<div>
			<h1>Page Not Found</h1>
			<p>Sorry, this page does not exist.</p>
			<button onClick={() => props.history.push("/")} type="button">
				Go to Home
			</button>
		</div>
	);
};

export default withRouter(NotFound);
