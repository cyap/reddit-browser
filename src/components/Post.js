import React from 'react';

class Post extends React.Component {
	render() {
		return (
			<div>
				{this.props.title}
				{this.props.author}
				{this.props.score}
			</div>
		)
	}
}

export default Post;