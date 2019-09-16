import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteAccount } from "../../actions/profileActions.js";
import styled from "styled-components";
import { Label, Divider, Button, Icon } from "semantic-ui-react";
import isEmpty from "../../validation/isEmpty";
import EditSkills from "../edit-profile/EditSkills.js";

class ProfileAbout extends Component {
	state = {
		skillFormOpen: false
	};
	onDeleteClick = () => {
		this.props.deleteAccount(this.props.history);
	};

	handleSkillForm = () => {
		this.setState(prev => ({ skillFormOpen: !prev.skillFormOpen }));
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
		const { profile, user } = this.props;
		const { skillFormOpen } = this.state;

		return (
			<div>
				<Segment>
					<div className="experience-top">
						<h4>Skills:</h4>
						{profile.user._id === user.id ? (
							<Icon
								onClick={this.handleSkillForm}
								size="large"
								style={{ fontSize: "1.15rem" }}
								link
								name={skillFormOpen ? "close" : "pencil"}
							/>
						) : null}
					</div>
					{skillFormOpen && <EditSkills profile={profile} />}
					{!skillFormOpen && (
						<div>
							<Divider />
							{profile.skills.map((skill, i) => (
								<span style={{ marginRight: "1rem" }} key={i}>
									<Label
										style={{ marginBottom: ".5rem" }}
										circular
										color="blue"
									>
										{skill}
									</Label>
								</span>
							))}
						</div>
					)}
				</Segment>
				<Segment>
					<h4>Delete your Account:</h4>
					<Divider />
					<div>
						<Button
							color="red"
							compact
							onClick={this.onDeleteClick}
							content="Delete My Account"
						/>
					</div>
				</Segment>
			</div>
		);
	}
}

ProfileAbout.propTypes = {
	profile: PropTypes.object.isRequired
};

export default connect(
	null,
	{ deleteAccount }
)(withRouter(ProfileAbout));
