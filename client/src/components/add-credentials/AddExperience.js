import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import ptLocale from 'react-semantic-ui-datepickers/dist/locales/pt-BR';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

import { Form, Button, Label } from 'semantic-ui-react';
import TextFieldGroup from '../common/TextFieldGroup';
import TextareaFieldGroup from '../common/TextareaFieldGroup';
import { addExperience } from '../../actions/profileActions';
import './Addcreds.scss';
class AddExperience extends Component {
	constructor(props) {
		super(props);
		this.state = {
			company: '',
			title: '',
			location: '',
			from: '',
			to: '',
			current: false,
			description: '',
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
			company: this.state.company,
			description: this.state.description,
			location: this.state.location,
			from: this.state.from,
			to: this.state.to,
			title: this.state.title,
			current: this.state.current
		};
		console.log('data', data);
		this.props.addExperience(data, this.props.history);
	};

	render() {
		const { errors } = this.state;
		console.log('errors', errors);
		return (
			<div className="form form-green">
				{/*<Link to="/dashboard">Go Back</Link>*/}
				<div className="form-header">
					<h4>Add Your Experience</h4>
				</div>
				<div className="form-main">
					<Form onSubmit={this.onSubmit}>
						<Form.Group widths="equal">
							<Form.Input
								name="title"
								value={this.state.title}
								onChange={this.onChange}
								fluid
								error={errors.title ? errors.title : null}
								transparent
								placeholder="Position / Title"
							/>
						</Form.Group>
						<Form.Group widths="equal">
							<Form.Input
								name="company"
								value={this.state.company}
								onChange={this.onChange}
								fluid
								error={errors.company ? errors.company : null}
								transparent
								placeholder="Company"
							/>
							<Form.Input
								name="location"
								value={this.state.location}
								onChange={this.onChange}
								fluid
								transparent
								placeholder="Location"
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
							placeholder="Job Description / Responsibilities"
							value={this.state.description}
							onChange={this.onChange}
							error={errors.description}
						/>
						<div style={{ textAlign: 'center', marginTop: '2rem' }}>
							<Button type="submit" size="tiny" circular content="Submit" />
						</div>
					</Form>
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
