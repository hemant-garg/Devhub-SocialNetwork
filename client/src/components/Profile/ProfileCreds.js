import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { Divider, Icon } from "semantic-ui-react";
import Moment from "react-moment";
import isEmpty from "../../validation/isEmpty";
import AddExperience from "../add-credentials/AddExperience";
import AddEducation from "../add-credentials/AddEducation";

import {
	deleteExperience,
	deleteEducation
} from "../../actions/profileActions";
class ProfileCreds extends Component {
	state = { expFormOpen: false, eduFormOpen: false };

	// componentDidUpdate(prevProps) {
	// 	this.setState({ expFormOpen: false });
	// }

	handleExpForm = () => {
		this.setState(prev => ({ expFormOpen: !prev.expFormOpen }));
	};
	handleEduForm = () => {
		this.setState(prev => ({ eduFormOpen: !prev.eduFormOpen }));
	};
	onDeleteExp = id => {
		this.props.deleteExperience(id);
	};
	onDeleteEdu = id => {
		this.props.deleteEducation(id);
	};

	render() {
		const Segment = styled.div`
			border-radius: 0.5rem;
			box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
			margin-bottom: 2rem;
			background-color: #fff;
			padding: 2rem 1.5rem;
			font-family: "Montserrat", sans-serif;
			box-sizing: border-box;
		`;
		const { education, experience, userId, auth } = this.props;
		console.log("profilecreds", this.props);
		const expItems = experience.map(exp => (
			<div className="experience" key={exp._id}>
				<Divider />
				<div className="experience-top">
					<h5>{exp.title}</h5>
					{userId === auth.user.id ? (
						<Icon
							onClick={() => this.onDeleteExp(exp._id)}
							color="red"
							link
							circular
							name="trash alternate"
						/>
					) : null}
				</div>
				<div className="experience-company">{exp.company}</div>
				<div className="experience-date">
					{<Moment format="YYYY/MM/DD">{exp.from}</Moment>} -
					{exp.current ? (
						" Present"
					) : (
						<Moment format="YYYY/MM/DD"> {exp.to}</Moment>
					)}
				</div>
				<div>
					{isEmpty(exp.description) ? null : <span>{exp.description}</span>}
				</div>
			</div>
		));

		const eduItems = education.map(edu => (
			<div className="experience" key={edu._id}>
				<Divider />
				<div className="experience-top">
					<h5>{edu.degree}</h5>
					{userId === auth.user.id ? (
						<Icon
							onClick={() => this.onDeleteEdu(edu._id)}
							color="red"
							link
							circular
							name="trash alternate"
						/>
					) : null}
				</div>
				<div className="experience-company">{edu.school}</div>

				<div style={{ fontSize: ".9rem" }}>{edu.fieldofstudy}</div>
				<div className="experience-date">
					{<Moment format="YYYY/MM/DD">{edu.from}</Moment>} -
					{edu.current ? (
						" Present"
					) : (
						<Moment format="YYYY/MM/DD"> {edu.to}</Moment>
					)}
				</div>
				<p>
					{isEmpty(edu.description) ? null : <span>{edu.description}</span>}
				</p>
			</div>
		));

		console.log("profile creds", this.props);
		const { eduFormOpen, expFormOpen } = this.state;
		return (
			<div>
				<Segment>
					<div className="experience-top">
						<h4>Experience</h4>
						{userId === auth.user.id ? (
							<Icon
								onClick={this.handleExpForm}
								size="large"
								link
								name={expFormOpen ? "minus circle" : "add circle"}
							/>
						) : null}
					</div>
					{expFormOpen && (
						<div>
							<AddExperience />
						</div>
					)}

					{expItems.length > 0 ? (
						<div>{expItems}</div>
					) : (
						<p>No Experience Listed</p>
					)}
				</Segment>
				<Segment>
					<div className="experience-top">
						<h4>Education</h4>
						{userId === auth.user.id ? (
							<Icon
								onClick={this.handleEduForm}
								size="large"
								link
								name={eduFormOpen ? "minus circle" : "add circle"}
							/>
						) : null}
					</div>
					{eduFormOpen && (
						<div>
							<AddEducation />
						</div>
					)}
					{eduItems.length > 0 ? (
						<div>{eduItems}</div>
					) : (
						<p>No Education Listed</p>
					)}
				</Segment>
			</div>
		);
	}
}

ProfileCreds.propTypes = {
	username: PropTypes.string
};

const mapStateToProps = ({ auth }) => {
	return { auth };
};
export default connect(
	mapStateToProps,
	{ deleteExperience, deleteEducation }
)(ProfileCreds);
