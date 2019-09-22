import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

import { Form, Button } from "semantic-ui-react";
import TextareaFieldGroup from "../common/TextareaFieldGroup";
import { addEducation } from "../../actions/profileActions";
import "./Addcreds.scss";

class AddEducation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			school: "",
			degree: "",
			fieldofstudy: "",
			from: "",
			to: "",
			current: false,
			description: "",
			errors: {},
			disabled: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) this.setState({ errors: nextProps.errors });
	}
	onCheck = e => {
		this.setState({
			disabled: !this.state.disabled,
			current: !this.state.current
		});
	};

	addDateFrom = date => {
		this.setState({ from: date });
	};
	addDateTo = date => {
		this.setState({ to: date });
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		const data = {
			school: this.state.school,
			degree: this.state.degree,
			fieldofstudy: this.state.fieldofstudy,
			from: this.state.from,
			to: this.state.to,
			title: this.state.title,
			current: this.state.current,
			description: this.state.description
		};
		this.props.addEducation(data, this.props.history);
	};

	render() {
		const { errors } = this.state;
		return (
			<div className="form form-yellow">
				{/*<Link to="/dashboard">Go Back</Link>*/}
				<div className="form-header">
					<h4>Add Your Education</h4>
				</div>
				<div className="form-main">
					<Form onSubmit={this.onSubmit}>
						<Form.Group widths="equal">
							<Form.Input
								name="school"
								value={this.state.school}
								onChange={this.onChange}
								fluid
								error={errors.school ? errors.school : null}
								transparent
								placeholder="School / Institute"
							/>
						</Form.Group>
						<Form.Group widths="equal">
							<Form.Input
								name="degree"
								value={this.state.degree}
								onChange={this.onChange}
								fluid
								error={errors.degree ? errors.degree : null}
								transparent
								placeholder="Degree"
							/>
							<Form.Input
								name="fieldofstudy"
								value={this.state.fieldofstudy}
								onChange={this.onChange}
								error={errors.fieldofstudy ? errors.fieldofstudy : null}
								fluid
								transparent
								placeholder="Field of Study"
							/>
						</Form.Group>
						<Form.Group widths="equal">
							<SemanticDatepicker
								transparent
								fluid
								name="from"
								error={errors.from ? errors.from : null}
								value={this.state.from}
								placeholder="Started From"
								onDateChange={this.addDateFrom}
							/>
							<SemanticDatepicker
								fluid
								name="to"
								value={this.state.to}
								transparent
								error={errors.to ? errors.to : null}
								disabled={this.state.disabled}
								placeholder="To"
								onDateChange={this.addDateTo}
							/>
						</Form.Group>
						<Form.Checkbox
							name="current"
							checked={this.state.current}
							onChange={this.onCheck}
							label="Currently Working here"
						/>
						<TextareaFieldGroup
							name="description"
							rows={3}
							placeholder="Description.."
							value={this.state.description}
							onChange={this.onChange}
							error={errors.description}
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

AddEducation.propTypes = {
	errors: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	addEducation: PropTypes.func.isRequired
};

const mapStateToProps = ({ profile, errors }) => {
	return { profile, errors };
};
export default connect(
	mapStateToProps,
	{ addEducation }
)(withRouter(AddEducation));
