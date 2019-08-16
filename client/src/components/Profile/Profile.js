import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';

import { getProfileByHandle } from '../../actions/profileActions';
import './Profile.scss';
import ProfileLeft from './ProfileLeft';
import ProfileRight from './ProfileRight';
class Profile extends Component {
	componentDidMount() {
		if (this.props.match.params.handle) {
			this.props.getProfileByHandle(this.props.match.params.handle);
		}
	}
	componentWillReceiveProps(nextProps) {
		// console.log(nextProps);
		if (nextProps.errors.noprofile) {
			this.props.history.push('/not-found');
		}
	}
	render() {
		const { profile, loading } = this.props.profile;
		const { user } = this.props.auth;
		let profileContent;
		if (profile === null || loading) profileContent = <Spinner />;
		else {
			profileContent = (
				<div>
					<div className="profile">
						<ProfileLeft profile={profile} user={user} />
						<div className="profile-middle">
							{/*<ProfileHeader profile={profile} />*/}

							<ProfileCreds
								userId={profile.user._id}
								education={profile.education}
								experience={profile.experience}
							/>
							<ProfileAbout profile={profile} />
						</div>
						<ProfileRight profile={profile} />
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
