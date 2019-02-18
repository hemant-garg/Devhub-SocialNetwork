import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TextFieldGroup from "../common/TextFieldGroup";
import TextareaFieldGroup from "../common/TextareaFieldGroup";
import { addExperience } from "../../actions/profileActions";

class AddExperience extends Component {
	constructor(props) {
		super(props);
		this.state = {
			company: "",
			title: "",
			location: "",
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
			company: this.state.company,
			description: this.state.description,
			location: this.state.location,
			from: this.state.from,
			to: this.state.to,
			title: this.state.title,
			current: this.state.current
		};
		this.props.addExperience(data, this.props.history);
	};

	render() {
		const { errors } = this.state;
		return (
			<div>
				<div className="section add-experience">
					<div className="container">
						<div className="row">
							<div className="col-md-8 m-auto">
								<Link to="/dashboard" className="btn btn-light">
									Go Back
								</Link>
								<h1 className="display-4 text-center">Add Your Experience</h1>
								<p className="lead text-center">
									Add any developer/programming positions that you have had in
									the past
								</p>
								<small className="d-block pb-3">* = required field</small>
								<form onSubmit={this.onSubmit}>
									<TextFieldGroup
										name="title"
										placeholder="* Job Title/Position"
										type="text"
										value={this.state.title}
										onChange={this.onChange}
										error={errors.title}
									/>
									<TextFieldGroup
										name="company"
										placeholder="* Company"
										type="text"
										value={this.state.company}
										onChange={this.onChange}
										error={errors.company}
										info="Could be your own company or one you work for "
									/>

									<TextFieldGroup
										name="location"
										placeholder="Location"
										value={this.state.location}
										onChange={this.onChange}
										error={errors.location}
										info="City & state suggested (eg. Boston, MA)"
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
											Currently Working here
										</label>
									</div>
									<TextareaFieldGroup
										name="description"
										placeholder="Job Description"
										value={this.state.description}
										onChange={this.onChange}
										error={errors.description}
										info="Tell us about the position/responsibilities"
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

AddExperience.propTypes = {
	errors: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	addExperience: PropTypes.func.isRequired
};

const mapStateToProps = ({ profile, errors }) => {
	return { profile, errors };
};
export default connect(
	mapStateToProps,
	{ addExperience }
)(withRouter(AddExperience));
