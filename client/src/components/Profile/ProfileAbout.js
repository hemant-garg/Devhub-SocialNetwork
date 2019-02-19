import React, { Component } from "react";
import PropTypes from "prop-types";

import isEmpty from "../../validation/isEmpty";

class ProfileAbout extends Component {
	render() {
		const { profile } = this.props;
		const firstName = profile.user.name.split(" ")[0];

		return (
			<div class="row">
				<div class="col-md-12">
					<div class="card card-body bg-light mb-3">
						<h3 class="text-center text-info">{`${firstName}'s Bio`}</h3>
						<p class="lead text-center">
							{isEmpty(profile.bio) ? (
								<span>{firstName} does not have a bio</span>
							) : (
								<span>{profile.bio}</span>
							)}
						</p>
						<hr />
						<h3 class="text-center text-info">Skill Set</h3>
						<div class="row">
							<div class="d-flex flex-wrap justify-content-center align-items-center">
								{profile.skills.map((skill, i) => (
									<div key={i} class="p-3">
										<i class="fa fa-check" /> {skill}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ProfileAbout.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileAbout;
