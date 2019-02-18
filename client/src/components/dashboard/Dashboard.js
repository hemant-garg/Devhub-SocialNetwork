import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
	getCurrentProfile,
	deleteAccount
} from "../../actions/profileActions.js";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
	componentDidMount() {
		this.props.getCurrentProfile();
	}

	onDeleteClick = () => {
		this.props.deleteAccount();
	};

	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;
		let dashboardContent;
		if (profile === null || loading) {
			dashboardContent = <Spinner />;
		} else {
			if (Object.keys(profile).length > 0) {
				dashboardContent = (
					<div>
						<p className="lead text-muted">
							Welcome,
							<Link to={`/profile/${profile.handle}`}> {user.name}</Link>
						</p>
						<ProfileActions />
						<Experience experience={profile.experience} />
						<Education education={profile.education} />
						<div style={{ marginBottom: "60px" }}>
							<button onClick={this.onDeleteClick} className="btn btn-danger">
								Delete My Account
							</button>
						</div>
					</div>
				);
			} else {
				dashboardContent = (
					<div>
						<p className="lead text-muted">Welcome, {user.name}</p>
						<p>You have not yet setup a profile, Please add some info</p>
						<Link to="/create-profile" className="btn btn-lg btn-info">
							Create Profile
						</Link>
					</div>
				);
			}
		}

		return (
			<div className="dashboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4">Dashboard</h1>
							{dashboardContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	auth: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object,
	deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth, profile }) => {
	return { auth, profile };
};

export default connect(
	mapStateToProps,
	{ getCurrentProfile, deleteAccount }
)(Dashboard);
