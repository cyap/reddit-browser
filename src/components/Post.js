import React from 'react';
import logo from '../logo.svg';

class Post extends React.Component {
	render() {
		return (
			<div className="post">
				<div className="titleBox">
					<img className="thumbnail" src={this.props.post.thumbnail || logo} alt="?"/>
					<a href={this.props.post.url} className="title">
						{new DOMParser().parseFromString(this.props.post.title, "text/html").documentElement.textContent}
					</a>
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