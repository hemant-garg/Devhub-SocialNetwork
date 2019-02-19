import React, { Component } from "react";
import PropTypes from "prop-types";

class ProfileGithub extends Component {
	constructor(props) {
		super(props);
		this.state = {
			clientId: "5c1b0f4a3bcce086e8eb",
			clientSecret: "955db34b1f9dfe9c43b7754207efcf4728fe6a74",
			count: 5,
			sort: "created: asc",
			repos: []
		};
	}
	componentDidMount() {
		const { username } = this.props;
		const { count, sort, clientId, clientSecret } = this.state;
		fetch(
			`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
		)
			.then(res => res.json())
			.then(data => {
				if (data.message !== "not found" && this.refs.myRef)
					this.setState({ repos: data });
			})
			.catch(err => console.log(err));
	}
	render() {
		const { repos } = this.state;
		let repoItems;
		if (repos.length > 0) {
			repoItems = repos.map(repo => (
				<div key={repo.id} className="card card-body mb-2">
					<div className="row">
						<div className="col-md-6">
							<h4>
								<a
									href={repo.html_url}
									className="text-info"
									rel="noopener noreferrer"
									target="_blank"
								>
									{repo.name}
								</a>
							</h4>
							<p>{repo.description}</p>
						</div>
						<div className="col-md-6">
							<span className="badge badge-info mr-1">
								Stars: {repo.stargazers_count}
							</span>
							<span className="badge badge-secondary mr-1">
								Watchers: {repo.watchers_count}
							</span>
							<span className="badge badge-success">
								Forks: {repo.forks_count}
							</span>
						</div>
					</div>
				</div>
			));
		} else {
			repoItems = "No repository found !";
		}
		return (
			<div ref="myRef">
				<hr />
				<h3 className="mb-4">Latest Github Repos</h3>
				{repoItems}
			</div>
		);
	}
}

ProfileGithub.propTypes = {
	username: PropTypes.string.isRequired
};

export default ProfileGithub;
