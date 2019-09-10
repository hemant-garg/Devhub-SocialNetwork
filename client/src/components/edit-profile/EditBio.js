import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Form, Button, Label } from "semantic-ui-react";

import InputGroup from "../common/InputGroup";
import TextareaFieldGroup from "../common/TextareaFieldGroup";

import { addBio, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/isEmpty";

class EditBio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bio: this.props.profile.bio,
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
			bio: this.state.bio
		};
		// console.log("data sent: ", profileData);
		this.props.addBio(profileData);
	};

	render() {
		const { profile } = this.props;
		const { errors, bio } = this.state;
		return (
			<div className="form form-red">
				{/*<Link to="/dashboard">Go Back</Link>*/}
				<div className="form-header">
					<h4>Edit Bio: </h4>
				</div>
				<div className="form-main">
					<Form onSubmit={this.onSubmit}>
						<TextareaFieldGroup
							name="bio"
							error={errors.bio}
							rows={3}
							onChange={this.onChange}
							value={bio}
							placeholder="Add your bio here.."
						/>

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
	{ addBio }
)(withRouter(EditBio));
