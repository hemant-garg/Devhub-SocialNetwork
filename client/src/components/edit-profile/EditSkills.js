import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Form, Button, Label } from "semantic-ui-react";
import TextareaFieldGroup from "../common/TextareaFieldGroup";
import { addSkills } from "../../actions/profileActions";

class EditSkills extends Component {
	constructor(props) {
		super(props);
		this.state = {
			skills: this.props.profile.skills.join(", "),
			errors: {}
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
		// if (nextProps.profile.profile) {
		// 	const profile = nextProps.profile.profile;
		// 	const skillsCSV = profile.skills.join(',');

		// 	this.setState({
		// 		skills: skillsCSV
		// 	});
		// }
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		const profileData = {
			skills: this.state.skills
		};
		this.props.addSkills(profileData);
	};

	render() {
		const { errors, skills } = this.state;
		return (
			<div className="form form-red">
				<div className="form-header">
					<h4>Edit Skill: </h4>
				</div>
				<div className="form-main">
					<Form onSubmit={this.onSubmit}>
						<TextareaFieldGroup
							name="skills"
							error={errors.skills}
							rows={3}
							onChange={this.onChange}
							value={skills}
							placeholder="Add your Skills here.."
						/>
						<p style={{ color: "#fff", fontSize: ".8rem" }}>
							* Each skill must be comma separated
						</p>
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
	{ addSkills }
)(withRouter(EditSkills));
