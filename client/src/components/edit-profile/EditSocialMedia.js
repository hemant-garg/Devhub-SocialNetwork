import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Form, Button, Label } from "semantic-ui-react";

import {
	editSocialMedia,
	getCurrentProfile
} from "../../actions/profileActions";
import isEmpty from "../../validation/isEmpty";

class EditSocialMedia extends Component {
	constructor(props) {
		super(props);
		this.state = {
			website: this.props.profile.website,
			githubusername: this.props.profile.githubusername,
			instagram: this.props.profile.social
				? this.props.profile.social.instagram
				: "",
			youtube: this.props.profile.social
				? this.props.profile.social.youtube
				: "",
			linkedin: this.props.profile.social
				? this.props.profile.social.linkedin
				: "",
			errors: {}
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}

		if (nextProps.profile.profile) {
			const profile = nextProps.profile.profile;
			// Check if profile build doesnt exist
			profile.website = !isEmpty(profile.website) ? profile.website : "";
			profile.githubusername = !isEmpty(profile.githubusername)
				? profile.githubusername
				: "";
			profile.social = !isEmpty(profile.social) ? profile.social : {};
			profile.instagram = !isEmpty(profile.social.instagram)
				? profile.social.instagram
				: "";
			profile.youtube = !isEmpty(profile.social.youtube)
				? profile.social.youtube
				: "";
			profile.linkedin = !isEmpty(profile.social.linkedin)
				? profile.social.linkedin
				: "";
			// console.log(profile);
			this.setState({
				youtube: profile.youtube,
				linkedin: profile.linkedin,
				instagram: profile.instagram,
				website: profile.website,
				githubusername: profile.githubusername
			});
		}
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		const profileData = {
			website: this.state.website,
			githubusername: this.state.githubusername,
			instagram: this.state.instagram,
			youtube: this.state.youtube,
			linkedin: this.state.linkedin
		};
		// console.log("data sent: ", profileData);
		this.props.editSocialMedia(profileData);
	};

	render() {
		const { errors } = this.state;
		// console.log("social eroor", errors);
		return (
			<div className="form form-pink">
				{/*<Link to="/dashboard">Go Back</Link>*/}
				<div className="form-header">
					<h4>Edit Social Links: </h4>
				</div>
				<div className="form-main">
					<Form onSubmit={this.onSubmit}>
						<Form.Input
							name="website"
							value={this.state.website}
							onChange={this.onChange}
							fluid
							error={errors.website ? errors.website : null}
							transparent
							placeholder="Website"
						/>
						<Form.Input
							name="linkedin"
							value={this.state.linkedin}
							onChange={this.onChange}
							fluid
							error={errors.linkedin ? errors.linkedin : null}
							transparent
							placeholder="Linkedin"
						/>
						<Form.Input
							name="githubusername"
							value={this.state.githubusername}
							onChange={this.onChange}
							fluid
							error={errors.githubusername ? errors.githubusername : null}
							transparent
							placeholder="Github Username"
						/>
						<Form.Input
							name="instagram"
							value={this.state.instagram}
							onChange={this.onChange}
							fluid
							// error={errors.instagram ? errors.instagram : null}
							transparent
							placeholder="Instagram"
						/>
						<Form.Input
							name="youtube"
							value={this.state.youtube}
							onChange={this.onChange}
							fluid
							error={errors.youtube ? errors.youtube : null}
							transparent
							placeholder="Youtube"
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
	{ editSocialMedia }
)(withRouter(EditSocialMedia));
