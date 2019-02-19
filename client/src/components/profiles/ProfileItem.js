import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/isEmpty";

class ProfileItem extends Component {
	render() {
		const { profile } = this.props;
		return (
			<div className="card card-body bg-light mb-3">
				<div className="row">
					<div className="col-2">
						<img className="rounded-circle" src={profile.user.avatar} alt="" />
					</div>
					<div className="col-lg-6 col-md-4 col-8">
						<h3>{profile.user.name}</h3>
						<p>
							{profile.status} at{" "}
							{!isEmpty(profile.company) ? profile.company : null}
						</p>
						<p>{!isEmpty(profile.location) ? profile.location : null}</p>
						<Link to={`/profile/${profile.handle}`} className="btn btn-info">
							View Profile
						</Link>
					</div>
					<div className="col-md-4 d-none d-lg-block">
						<h4>Skill Set</h4>
						<ul className="list-group">
							{profile.skills.slice(0, 4).map((skill, i) => (
								<li key={i} className="list-group-item">
									<i className="fa fa-check pr-1" />
									{skill}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileItem;
