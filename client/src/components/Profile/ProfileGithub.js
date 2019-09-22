import React, { Component } from "react";
import PropTypes from "prop-types";
import { Label, Divider } from "semantic-ui-react";

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
			repoItems = repos.map((repo, i) => {
				if (i > 3) return;
				if (i > 2)
					return (
						<div key={repo.id} style={{ textAlign: "center" }}>
							<strong>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href={`https://github.com/${this.props.username}`}
								>
									View all
								</a>
							</strong>
						</div>
					);

				return (
					<div key={repo.id} className="repo">
						<h5 style={{ marginBottom: ".5rem" }}>
							<a href={repo.html_url} rel="noopener noreferrer" target="_blank">
								{repo.name}
							</a>
						</h5>
						<p>{repo.description}</p>
						<Label color="blue" size="tiny">
							Stars
							<Label.Detail>{repo.stargazers_count}</Label.Detail>
						</Label>
						<Label color="pink" size="tiny">
							Watchers
							<Label.Detail>{repo.watchers_count}</Label.Detail>
						</Label>
						<Label color="black" size="tiny">
							Forks
							<Label.Detail>{repo.forks_count}</Label.Detail>
						</Label>
						<Divider />
					</div>
				);
			});
		} else {
			repoItems = "No repository found !";
		}
		return <div ref="myRef">{repoItems}</div>;
	}
}

ProfileGithub.propTypes = {
	username: PropTypes.string.isRequired
};

export default ProfileGithub;
