import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Form, Button, Label } from "semantic-ui-react";

import InputGroup from "../common/InputGroup";
import TextareaFieldGroup from "../common/TextareaFieldGroup";

import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/isEmpty";

class EditGithub extends Component {
	constructor(props) {
		super(props);
		this.state = {
			github: this.props.profile.githubusername,
			errors: {}
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
		// if (nextProps.profile.profile) {
		// 	const profile = nextProps.profile.profile;
		// 	const skillsCSV = profile.skills.join(',');

		// 	this.setState({
		// 		skills: skillsCSV
		// 	});
		// }
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		const profileData = {
			github: this.state.github
		};
		// console.log("data sent: ", profileData);
		this.props.createProfile(profileData, this.props.history);
	};

	render() {
		const { profile } = this.props;
		const { errors, github } = this.state;
		return (
			<div className="form form-red">
				{/*<Link to="/dashboard">Go Back</Link>*/}
				<div className="form-header">
					<h4>Edit Github username: </h4>
				</div>
				<div className="form-main">
					<Form onSubmit={this.onSubmit}>
						<TextareaFieldGroup
							name="github"
							error={errors.github}
							rows={2}
							onChange={this.onChange}
							value={github}
							placeholder="Github username.."
						/>

						{/*}	<Form.Input
							name="youtube"
							value={this.state.youtube}
							onChange={this.onChange}
							fluid
							error={errors.youtube ? errors.youtube : null}
							transparent
							placeholder="Youtube"
        /> */}
						<div style={{ textAlign: "center", marginTop: "2rem" }}>
							<Button type="submit" size="tiny" circular content="Submit" />
						</div>
					</Form>
				</div>
			</div>
		);
	}
}
const mapStateToProps = ({ errors }) => {
	return { errors };
};

export default connect(
	mapStateToProps,
	{ createProfile }
)(withRouter(EditGithub));
