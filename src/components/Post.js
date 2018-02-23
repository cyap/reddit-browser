import React from 'react';

class Post extends React.Component {
	render() {
		return (
			<div className="post">
				<div className="title">
					{this.props.post.title}
				</div>
				<div>
					<span className="author">Author: {this.props.post.author}</span>
					<span className="score">Score: {this.props.post.score}</span>
				</div>
			</div>
		)
	}
}

export default Post;