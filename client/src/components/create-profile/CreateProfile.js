import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextareaFieldGroup from "../common/TextareaFieldGroup";
import SelectListFieldGroup from "../common/SelectListFieldGroup";
import InputGroup from "../common/InputGroup";
import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displaySocialInputs: false,
			handle: "",
			company: "",
			website: "",
			status: "",
			bio: "",
			location: "",
			skills: "",
			githubusername: "",
			twitter: "",
			facebook: "",
			instagram: "",
			youtube: "",
			linkedin: "",
			errors: {}
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		const profileData = {
			handle: this.state.handle,
			status: this.state.status,
			company: this.state.company,
			website: this.state.website,
			bio: this.state.bio,
			location: this.state.location,
			skills: this.state.skills,
			githubusername: this.state.githubusername,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			instagram: this.state.instagram,
			youtube: this.state.youtube,
			linkedin: this.state.linkedin
		};
		this.props.createProfile(profileData, this.props.history);
	};

	render() {
		const { errors, displaySocialInputs } = this.state;
		const statusOptions = [
			{ label: "* Select Professional Status", value: 0 },
			{ label: "Developer", value: "Developer" },
			{ label: "Senior Developer", value: "Senior Developer" },
			{ label: "Junior Developer", value: "Junior Developer" },
			{ label: "Student/Learning", value: "Student/Learning" },
			{ label: "Instructor/Teacher", value: "Instructor/Teacher" },
			{ label: "Intern", value: "Intern" },
			{ label: "Other", value: "Other" }
		];
		let socialInputs;
		if (displaySocialInputs) {
			socialInputs = (
				<div>
					<InputGroup
						placeholder="Twitter Profile URL"
						name="twitter"
						icon="fab fa-twitter"
						value={this.state.twitter}
						onChange={this.onChange}
						error={errors.twitter}
					/>
					<InputGroup
						placeholder="Linkedin Profile URL"
						name="linkedin"
						icon="fab fa-linkedin"
						value={this.state.linkedin}
						onChange={this.onChange}
						error={errors.linkedin}
					/>
					<InputGroup
						placeholder="Facebook Profile URL"
						name="facebook"
						icon="fab fa-facebook"
						value={this.state.facebook}
						onChange={this.onChange}
						error={errors.facebook}
					/>
					<InputGroup
						placeholder="Instagram Profile URL"
						name="instagram"
						icon="fab fa-instagram"
						value={this.state.instagram}
						onChange={this.onChange}
						error={errors.instagram}
					/>
					<InputGroup
						placeholder="Youtube Profile URL"
						name="youtube"
						icon="fab fa-youtube"
						value={this.state.youtube}
						onChange={this.onChange}
						error={errors.youtube}
					/>
				</div>
			);
		}
		return (
			<div class="create-profile">
				<div class="container">
					<div class="row">
						<div class="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">
								Go Back
							</Link>
							<h1 class="display-4 text-center">Create Your Profile</h1>
							<p class="lead text-center">
								Let's get some information to make your profile stand out
							</p>
							<small class="d-block pb-3">* = required field</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									name="handle"
									placeholder="* Profile Handle"
									value={this.state.handle}
									onChange={this.onChange}
									error={errors.handle}
									info="A unique handle for your profile URL. Your full name, company name, nickname, etc"
								/>
								<SelectListFieldGroup
									name="status"
									placeholder="* Status"
									value={this.state.status}
									onChange={this.onChange}
									error={errors.status}
									options={statusOptions}
									info="Give us an idea of where you are at in your career"
								/>
								<TextFieldGroup
									name="company"
									placeholder="Company"
									type="text"
									value={this.state.company}
									onChange={this.onChange}
									error={errors.company}
									info="Could be your own company or one you work for "
								/>
								<TextFieldGroup
									name="website"
									placeholder="Website"
									value={this.state.website}
									onChange={this.onChange}
									error={errors.website}
									info="Could be your own or a company website"
								/>
								<TextFieldGroup
									name="location"
									placeholder="Location"
									value={this.state.location}
									onChange={this.onChange}
									error={errors.location}
									info="City & state suggested (eg. Boston, MA)"
								/>
								<TextFieldGroup
									name="skills"
									placeholder="* Skills"
									value={this.state.skills}
									onChange={this.onChange}
									error={errors.skills}
									info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
								/>
								<TextFieldGroup
									name="githubusername"
									placeholder="Github Username"
									value={this.state.githubusername}
									onChange={this.onChange}
									error={errors.githubusername}
									info="If you want your latest repos and a Github link, include your username"
								/>

								<TextareaFieldGroup
									name="bio"
									placeholder="Short Bio"
									value={this.state.bio}
									onChange={this.onChange}
									error={errors.bio}
									info="Tell us a little about yourself"
								/>
								<div class="mb-3">
									<button
										onClick={() => {
											this.setState(prevState => ({
												displaySocialInputs: !prevState.displaySocialInputs
											}));
										}}
										type="button"
										class="btn btn-light"
									>
										Add Social Network Links
									</button>
									<span class="text-muted">Optional</span>
								</div>

								{socialInputs}
								<input type="submit" class="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CreateProfile.propTypes = {
	errors: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = ({ profile, errors }) => {
	return { profile, errors };
};

export default connect(
	mapStateToProps,
	{ createProfile }
)(withRouter(CreateProfile));
