import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import Spinner from "../common/Spinner";

import { getProfileByHandle } from "../../actions/profileActions";
import "./Profile.scss";
import ProfileLeft from "./ProfileLeft";
import ProfileRight from "./ProfileRight";
class Profile extends Component {
	state = { handle: null };
	componentDidMount() {
		const { handle } = this.props.match.params;
		if (handle) {
			this.setState({ handle });
			this.props.getProfileByHandle(handle);
		}
	}
	componentWillReceiveProps(nextProps) {
		console.log("nextprops", nextProps.match.params.handle, this.state.handle);
		if (nextProps.errors.noprofile) {
			this.props.history.push("/not-found");
		}
		if (nextProps.match.params.handle !== this.state.handle) {
			console.log("update");
			let handle = nextProps.match.params.handle;
			this.props.getProfileByHandle(handle);
			this.setState({ handle });
		}
	}

	render() {
		const { profile, loading } = this.props.profile;
		const { user } = this.props.auth;
		console.log("profile page", this.props);
		let profileContent;
		if (profile === null || loading) profileContent = <Spinner />;
		else {
			profileContent = (
				<div>
					<div className="profile">
						<ProfileLeft profile={profile} user={user} />
						<div className="profile-middle">
							<ProfileHeader user={user} profile={profile} />
							<ProfileCreds
								userId={profile.user._id}
								education={profile.education}
								experience={profile.experience}
							/>
							<ProfileAbout user={user} profile={profile} />
						</div>
						<ProfileRight user={user} profile={profile} />
					</div>
				</div>
			);
		}
		return <Container>{profileContent}</Container>;
	}
}

Profile.propTypes = {
	profile: PropTypes.object.isRequired,
	getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = ({ profile, errors, auth }) => {
	return { profile, errors, auth };
};
export default connect(
	mapStateToProps,
	{ getProfileByHandle }
)(Profile);
