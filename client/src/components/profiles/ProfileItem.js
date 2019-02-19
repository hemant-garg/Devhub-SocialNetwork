import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/isEmpty";

class ProfileItem extends Component {
	render() {
		const { profile } = this.props;
		return (
			<div class="card card-body bg-light mb-3">
				<div class="row">
					<div class="col-2">
						<img class="rounded-circle" src={profile.user.avatar} alt="" />
					</div>
					<div class="col-lg-6 col-md-4 col-8">
						<h3>{profile.user.name}</h3>
						<p>
							{profile.status} at{" "}
							{!isEmpty(profile.company) ? profile.company : null}
						</p>
						<p>{!isEmpty(profile.location) ? profile.location : null}</p>
						<Link to={`/profile/${profile.handle}`} class="btn btn-info">
							View Profile
						</Link>
					</div>
					<div class="col-md-4 d-none d-lg-block">
						<h4>Skill Set</h4>
						<ul class="list-group">
							{profile.skills.slice(0, 4).map((skill, i) => (
								<li key={i} class="list-group-item">
									<i class="fa fa-check pr-1" />
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
