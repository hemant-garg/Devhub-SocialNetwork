import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";

import { deleteExperience } from "../../actions/profileActions";

class Experience extends Component {
	onDeleteExp = id => {
		this.props.deleteExperience(id);
	};

	render() {
		const experience = this.props.experience.map(exp => (
			<tr key={exp._id}>
				<td>{exp.company}</td>
				<td>{exp.title}</td>
				<td>
					<Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
					{exp.current ? (
						"Present"
					) : (
						<Moment format="YYYY/MM/DD">{exp.to}</Moment>
					)}
				</td>
				<td>
					<button
						onClick={() => this.onDeleteExp(exp._id)}
						className="btn btn-danger"
					>
						Delete
					</button>{" "}
				</td>
			</tr>
		));
		return (
			<div>
				<h4 class="mb-2">Experience Credentials</h4>
				<table class="table">
					<thead>
						<tr>
							<th>Company</th>
							<th>Title</th>
							<th>Years</th>
							<th />
						</tr>
					</thead>
					<tbody>{experience}</tbody>
				</table>
			</div>
		);
	}
}

// Experience.propTypes = {
// 	errors: PropTypes.object.isRequired,
// 	profile: PropTypes.object.isRequired
// };

// const mapStateToProps = ({ profile, errors }) => {
// 	return { profile, errors };
// };

export default connect(
	null,
	{ deleteExperience }
)(Experience);
