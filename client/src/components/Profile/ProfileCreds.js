import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Divider, Icon } from 'semantic-ui-react';
import Moment from 'react-moment';
import isEmpty from '../../validation/isEmpty';

class ProfileCreds extends Component {
	render() {
		const Segment = styled.div`
			border-radius: 0.5rem;
			box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
			margin-bottom: 2rem;
			background-color: #fff;
			padding: 2rem;
			font-family: 'Montserrat', sans-serif;
			box-sizing: border-box;
		`;
		const { education, experience, userId, auth } = this.props;

		const expItems = experience.map(exp => (
			<div className="experience" key={exp._id}>
				<Divider />
				<h5>{exp.title}</h5>
				<div className="experience-company">{exp.company}</div>
				<div className="experience-date">
					{<Moment format="YYYY/MM/DD">{exp.from}</Moment>} -
					{exp.current ? (
						' Present'
					) : (
						<Moment format="YYYY/MM/DD"> {exp.to}</Moment>
					)}
				</div>
				<div>
					{isEmpty(exp.description) ? null : <span>{exp.description}</span>}
				</div>
			</div>
		));

		const eduItems = education.map(edu => (
			<div className="experience" key={edu._id}>
				<Divider />
				<h5>{edu.degree}</h5>
				<div className="experience-company">{edu.school}</div>

				<div style={{ fontSize: '.9rem' }}>{edu.fieldofstudy}</div>
				<div className="experience-date">
					{<Moment format="YYYY/MM/DD">{edu.from}</Moment>} -
					{edu.current ? (
						' Present'
					) : (
						<Moment format="YYYY/MM/DD"> {edu.to}</Moment>
					)}
				</div>
				<p>
					{isEmpty(edu.description) ? null : <span>{edu.description}</span>}
				</p>
			</div>
		));

		console.log(this.props);
		return (
			<div>
				<Segment>
					<div className="experience-top">
						<h4>Experience</h4>
						{userId === auth.user.id ? (
							<Icon size="large" link name="add circle" />
						) : null}
					</div>
					{expItems.length > 0 ? (
						<div>{expItems}</div>
					) : (
						<p>No Experience Listed</p>
					)}
				</Segment>
				<Segment>
					<div className="experience-top">
						<h4>Education</h4>
						{userId === auth.user.id ? (
							<Icon size="large" link name="add circle" />
						) : null}
					</div>
					{eduItems.length > 0 ? (
						<div>{eduItems}</div>
					) : (
						<p>No Education Listed</p>
					)}
				</Segment>
			</div>
		);
	}
}

ProfileCreds.propTypes = {
	username: PropTypes.string
};

const mapStateToProps = ({ auth }) => {
	return { auth };
};
export default connect(mapStateToProps)(ProfileCreds);
