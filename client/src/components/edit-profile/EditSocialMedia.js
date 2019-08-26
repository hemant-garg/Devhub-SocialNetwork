import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Button, Label } from 'semantic-ui-react';

import InputGroup from '../common/InputGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/isEmpty';

class EditSocialMedia extends Component {
	constructor(props) {
		super(props);
		this.state = {
			handle: '',
			company: '',
			website: '',
			status: '',
			bio: '',
			location: '',
			skills: '',
			githubusername: '',
			twitter: '',
			facebook: '',
			instagram: '',
			youtube: '',
			linkedin: '',
			errors: {}
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}

		if (nextProps.profile.profile) {
			const profile = nextProps.profile.profile;
			const skillsCSV = profile.skills.join(',');

			// Check if profile build doesnt exist
			profile.company = !isEmpty(profile.company) ? profile.company : '';
			profile.website = !isEmpty(profile.website) ? profile.website : '';
			profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
			profile.githubusername = !isEmpty(profile.githubusername)
				? profile.githubusername
				: '';
			profile.location = !isEmpty(profile.location) ? profile.location : '';
			profile.status = !isEmpty(profile.status) ? profile.status : '';
			profile.social = !isEmpty(profile.social) ? profile.social : {};
			profile.twitter = !isEmpty(profile.social.twitter)
				? profile.social.twitter
				: '';
			profile.facebook = !isEmpty(profile.social.facebook)
				? profile.social.facebook
				: '';
			profile.instagram = !isEmpty(profile.social.instagram)
				? profile.social.instagram
				: '';
			profile.youtube = !isEmpty(profile.social.youtube)
				? profile.social.youtube
				: '';
			profile.linkedin = !isEmpty(profile.social.linkedin)
				? profile.social.linkedin
				: '';
			// console.log(profile);
			this.setState({
				handle: profile.handle,
				skills: skillsCSV,
				youtube: profile.youtube,
				facebook: profile.facebook,
				linkedin: profile.linkedin,
				instagram: profile.instagram,
				twitter: profile.twitter,
				website: profile.website,
				company: profile.company,
				bio: profile.bio,
				githubusername: profile.githubusername,
				location: profile.location,
				status: profile.status
			});
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
		// console.log("data sent: ", profileData);
		this.props.createProfile(profileData, this.props.history);
	};

	render() {
		const { errors } = this.state;

		return (
			<div className="form form-pink">
				{/*<Link to="/dashboard">Go Back</Link>*/}
				<div className="form-header">
					<h4>Edit Social Links: </h4>
				</div>
				<div className="form-main">
					<Form onSubmit={this.onSubmit}>
						<Form.Input
							name="twitter"
							value={this.state.twitter}
							onChange={this.onChange}
							fluid
							error={errors.twitter ? errors.twitter : null}
							transparent
							placeholder="Twitter"
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
							name="facebook"
							value={this.state.facebook}
							onChange={this.onChange}
							fluid
							error={errors.facebook ? errors.facebook : null}
							transparent
							placeholder="Facebook"
						/>
						<Form.Input
							name="instagram"
							value={this.state.instagram}
							onChange={this.onChange}
							fluid
							error={errors.instagram ? errors.instagram : null}
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
						<div style={{ textAlign: 'center', marginTop: '2rem' }}>
							<Button type="submit" size="tiny" circular content="Submit" />
						</div>
					</Form>
				</div>
			</div>
			// <div class="create-profile">
			// 	<div class="container">
			// 		<div class="row">
			// 			<div class="col-md-8 m-auto">
			// 				<h1 class="display-4 text-center">Edit Your Profile</h1>
			// 				<form onSubmit={this.onSubmit}>
			// 					<div>
			// 						<InputGroup
			// 							placeholder="Twitter Profile URL"
			// 							name="twitter"
			// 							icon="fab fa-twitter"
			// 							value={this.state.twitter}
			// 							onChange={this.onChange}
			// 							error={errors.twitter}
			// 						/>
			// 						<InputGroup
			// 							placeholder="Linkedin Profile URL"
			// 							name="linkedin"
			// 							icon="fab fa-linkedin"
			// 							value={this.state.linkedin}
			// 							onChange={this.onChange}
			// 							error={errors.linkedin}
			// 						/>
			// 						<InputGroup
			// 							placeholder="Facebook Profile URL"
			// 							name="facebook"
			// 							icon="fab fa-facebook"
			// 							value={this.state.facebook}
			// 							onChange={this.onChange}
			// 							error={errors.facebook}
			// 						/>
			// 						<InputGroup
			// 							placeholder="Instagram Profile URL"
			// 							name="instagram"
			// 							icon="fab fa-instagram"
			// 							value={this.state.instagram}
			// 							onChange={this.onChange}
			// 							error={errors.instagram}
			// 						/>
			// 						<InputGroup
			// 							placeholder="Youtube Profile URL"
			// 							name="youtube"
			// 							icon="fab fa-youtube"
			// 							value={this.state.youtube}
			// 							onChange={this.onChange}
			// 							error={errors.youtube}
			// 						/>
			// 					</div>
			// 					<input type="submit" class="btn btn-info btn-block mt-4" />
			// 				</form>
			// 			</div>
			// 		</div>
			// 	</div>
			// </div>
		);
	}
}
const mapStateToProps = ({ errors }) => {
	return { errors };
};

export default connect(
	mapStateToProps,
	{ createProfile }
)(withRouter(EditSocialMedia));
