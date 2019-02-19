import React, { Component } from "react";
import PostItem from "./PostItem";
class PostFeed extends Component {
	render() {
		const { posts } = this.props;
		return (
			<div className="posts">
				{posts.map(post => (
					<PostItem key={post._id} post={post} />
				))}
			</div>
		);
	}
}

export default PostFeed;
