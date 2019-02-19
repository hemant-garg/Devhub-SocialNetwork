import React, { Component } from "react";
import PropTypes from "prop-types";

import Moment from "react-moment";
import isEmpty from "../../validation/isEmpty";
import Profile from "./Profile";

class ProfileCreds extends Component {
	render() {
		const { education, experience } = this.props;

		const expItems = experience.map(exp => (
			<li class="list-group-item" key={exp._id}>
				<h4>{exp.company}</h4>
				<p>
					{<Moment format="YYYY/MM/DD">{exp.from}</Moment>} -
					{exp.current ? (
						" Present"
					) : (
						<Moment format="YYYY/MM/DD"> {exp.to}</Moment>
					)}
				</p>
				<p>
					<strong>Position:</strong> {exp.title}
				</p>
				<p>
					{isEmpty(exp.location) ? null : (
						<span>
							<strong>Location:</strong> {exp.location}
						</span>
					)}
				</p>
				<p>
					{isEmpty(exp.description) ? null : (
						<span>
							<strong>Description:</strong> {exp.description}
						</span>
					)}
				</p>
			</li>
		));

		const eduItems = education.map(edu => (
			<li class="list-group-item" key={edu._id}>
				<h4>{edu.school}</h4>
				<p>
					{<Moment format="YYYY/MM/DD">{edu.from}</Moment>} -
					{edu.current ? (
						" Present"
					) : (
						<Moment format="YYYY/MM/DD"> {edu.to}</Moment>
					)}
				</p>
				<p>
					<strong>Degree:</strong> {edu.degree}
				</p>
				<p>
					<strong>Field Of Study:</strong> {edu.fieldofstudy}
				</p>
				<p>
					{isEmpty(edu.description) ? null : (
						<span>
							<strong>Description:</strong> {edu.description}
						</span>
					)}
				</p>
			</li>
		));

		return (
			<div class="row">
				<div class="col-md-6">
					<h3 class="text-center text-info">Experience</h3>
					{expItems.length > 0 ? (
						<ul class="list-group">{expItems}</ul>
					) : (
						<p className="text-center">No Experience Listed</p>
					)}
				</div>
				<div class="col-md-6">
					<h3 class="text-center text-info">Education</h3>
					{eduItems.length > 0 ? (
						<ul class="list-group">{eduItems}</ul>
					) : (
						<p className="text-center">No Education Listed</p>
					)}
				</div>
			</div>
		);
	}
}

ProfileCreds.propTypes = {
	username: PropTypes.string.isRequired
};

export default ProfileCreds;
