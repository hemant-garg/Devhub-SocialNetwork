import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profileActions";
import ProfileItem from "./ProfileItem.js";

class Profiles extends Component {
	componentDidMount() {
		this.props.getProfiles();
	}

	render() {
		const { profiles, loading } = this.props.profile;
		let profileItems;
		if (profiles === null || loading) profileItems = <Spinner />;
		else {
			if (profiles.length > 0) {
				profileItems = profiles.map(profile => (
					<ProfileItem profile={profile} key={profile._id} />
				));
			} else profileItems = <h4>No Profiles found ....</h4>;
		}
		return (
			<div className="profiles">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4 text-center">Developer Profiles</h1>
							<p className="lead text-center">
								Browse and connect with developers
							</p>
							{profileItems}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Profiles.propTypes = {
	profile: PropTypes.object,
	getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = ({ profile }) => {
	return { profile };
};

export default connect(
	mapStateToProps,
	{ getProfiles }
)(Profiles);
