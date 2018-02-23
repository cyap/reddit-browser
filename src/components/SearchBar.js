import React from 'react';

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      searchTerm: ''
    }
	}
	handleChange(searchTerm) {
		this.setState({searchTerm});
		// TODO: Suggested subreddits
	}
	handleSubmit(e) {
		e.preventDefault();
		return this.props.onSearch(this.state.searchTerm);
	}
	render() {
		return (
			<form className="searchBar" onSubmit={e => this.handleSubmit(e)}>
				<input
					type="text"
					placeholder="Enter subreddit name"
					onChange={e => this.handleChange(e.target.value)}
				/>
				<input
					type="submit"
				/>
			</form>
		)
	}
}

export default SearchBar;
