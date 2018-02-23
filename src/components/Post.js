import React from 'react';
import logo from '../logo.svg';

class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      open: false
    }
	}
	handleClick(e) {
		if (this.props.post.selfPost){
			e.preventDefault();
			this.setState({open: !this.state.open})
		}
	}
	selfPostExpansion = () => {
		if (this.props.post.selfPost) {
			return (
				<div className={"postContent" + (this.state.open ? '' : ' closed')}>
					{this.props.post.selftext}
				</div>
			)
		}
	}
	render() {
		return (
			<div className="post">
				<div className="titleBox">
					<img className="thumbnail" src={this.props.post.thumbnail || logo} alt="?"/>
					<a href={this.props.post.url} onClick={(e) => this.handleClick(e)} className="title">
						{new DOMParser().parseFromString(this.props.post.title, "text/html").documentElement.textContent}
					</a>
				</div>
				<div>
					<span className="author">Author: {this.props.post.author}</span>
					<span className="score">Score: {this.props.post.score}</span>
				</div>
				{this.selfPostExpansion()}
			</div>
		)
	}
}

export default Post;