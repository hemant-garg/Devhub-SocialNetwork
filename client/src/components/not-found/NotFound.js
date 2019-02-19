import React from "react";
import { withRouter } from "react-router-dom";

const NotFound = props => {
	return (
		<div>
			<h1 className="display-4">Page Not Found</h1>
			<p>Sorry, this page does not exist.</p>
			<button
				onClick={() => props.history.push("/")}
				type="button"
				className="btn btn-info btn-lg"
			>
				Go to Home
			</button>
		</div>
	);
};

export default withRouter(NotFound);
