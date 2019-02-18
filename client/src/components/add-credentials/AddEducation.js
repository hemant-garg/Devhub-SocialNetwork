import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TextFieldGroup from "../common/TextFieldGroup";
import TextareaFieldGroup from "../common/TextareaFieldGroup";
import { addEducation } from "../../actions/profileActions";

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
			<div>
				<div className="section add-education">
					<div className="container">
						<div className="row">
							<div className="col-md-8 m-auto">
								<Link to="/dashboard" className="btn btn-light">
									Go Back
								</Link>
								<h1 className="display-4 text-center">Add Your Education</h1>
								<p className="lead text-center">
									Add any school, bootcamp, etc that you have attended
								</p>
								<small className="d-block pb-3">* = required field</small>
								<form onSubmit={this.onSubmit}>
									<TextFieldGroup
										name="school"
										placeholder="* School Or Bootcamp"
										type="text"
										value={this.state.school}
										onChange={this.onChange}
										error={errors.school}
									/>
									<TextFieldGroup
										name="degree"
										placeholder="* Degree Or Certificate"
										type="text"
										value={this.state.degree}
										onChange={this.onChange}
										error={errors.degree}
									/>
									<TextFieldGroup
										name="fieldofstudy"
										placeholder="* Field Of Study"
										value={this.state.fieldofstudy}
										onChange={this.onChange}
										error={errors.fieldofstudy}
									/>
									<h6>* From Date: </h6>
									<TextFieldGroup
										name="from"
										type="date"
										value={this.state.from}
										onChange={this.onChange}
										error={errors.from}
									/>
									<h6>* To Date: </h6>
									<TextFieldGroup
										name="to"
										type="date"
										value={this.state.to}
										onChange={this.onChange}
										error={errors.to}
										disabled={this.state.disabled ? "disabled" : ""}
									/>
									<div className="form-check mb-4">
										<input
											type="checkbox"
											className="form-check-input"
											name="current"
											value={this.state.current}
											checked={this.state.current}
											id="current"
											onChange={this.onCheck}
										/>
										<label htmlFor="current" className="form-check-label">
											Currently studying here
										</label>
									</div>
									<TextareaFieldGroup
										name="description"
										placeholder="Program Description"
										value={this.state.description}
										onChange={this.onChange}
										error={errors.description}
										info="Tell us about the program that you were in"
									/>
									<input
										type="submit"
										className="btn btn-info btn-block mt-4"
									/>
								</form>
							</div>
						</div>
					</div>
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
