import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";

import { deleteEducation } from "../../actions/profileActions";

class Education extends Component {
	onDeleteEdu = id => {
		this.props.deleteEducation(id);
	};

	render() {
		const education = this.props.education.map(edu => (
			<tr key={edu._id}>
				<td>{edu.school}</td>
				<td>{edu.degree}</td>
				<td>
					<Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
					{edu.current ? (
						"Present"
					) : (
						<Moment format="YYYY/MM/DD">{edu.to}</Moment>
					)}
				</td>
				<td>
					<button
						onClick={() => this.onDeleteEdu(edu._id)}
						className="btn btn-danger"
					>
						Delete
					</button>{" "}
				</td>
			</tr>
		));
		return (
			<div>
				<h4 className="mb-2">Education Credentials</h4>
				<table className="table">
					<thead>
						<tr>
							<th>School</th>
							<th>Degree</th>
							<th>Years</th>
							<th />
						</tr>
					</thead>
					<tbody>{education}</tbody>
				</table>
			</div>
		);
	}
}

// Education.propTypes = {
// 	errors: PropTypes.object.isRequired,
// 	profile: PropTypes.object.isRequired
// };

// const mapStateToProps = ({ profile, errors }) => {
// 	return { profile, errors };
// };

export default connect(
	null,
	{ deleteEducation }
)(Education);
