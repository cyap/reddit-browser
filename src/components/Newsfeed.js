import React from 'react';
import Post from './Post';

class Newsfeed extends React.Component {
	render() {
		return (
			<div>
				{this.props.posts.map((post, i) => (
						<Post 
							key={i}
							post={post}
						/>
					)
				)}
			</div>
		)
	}
}

export default Newsfeed;