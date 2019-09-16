import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

import './SearchBox.scss';

class SearchBox extends Component {
	render() {
		return (
			<Input
				icon="search"
				className="searchbox"
				iconPosition="left"
				placeholder="Search users..."
			/>
		);
	}
}
export default SearchBox;
