import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import TextareaFieldGroup from "../common/TextareaFieldGroup";

import { addBio } from "../../actions/profileActions";

class EditBio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bio: this.props.profile.bio,
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
			bio: this.state.bio
		};
		this.props.addBio(profileData);
	};

	render() {
		const { errors, bio } = this.state;
		return (
			<div className="form form-red">
				<div className="form-header">
					<h4>Edit Bio: </h4>
				</div>
				<div className="form-main">
					<Form onSubmit={this.onSubmit}>
						<TextareaFieldGroup
							name="bio"
							error={errors.bio}
							rows={3}
							onChange={this.onChange}
							value={bio}
							placeholder="Add your bio here.."
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
	{ addBio }
)(withRouter(EditBio));
