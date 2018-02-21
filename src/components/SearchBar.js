import React from 'react';

class SearchBar extends React.Component {
	render() {
		return (
			<div>
				<input
					type="text"
					placeholder="Enter subreddit name"
				/>
				<input
					type="submit"
				/>
			</div>
		)
	}
}

export default SearchBar;