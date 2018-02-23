function jsonToPosts(body) {
	let rawPosts = body.data.children;
	let posts = rawPosts.map(post => {
		return {
			title: post.data.title,
			author: post.data.author,
			score: post.data.score, 
			thumbnail: validate_thumbnail(post),
			url: post.data.url
		}
	})
	return posts;
}

function validate_thumbnail(post) {
	return post.data.thumbnail.endsWith(".jpg") ? post.data.thumbnail : null;
}


export default jsonToPosts;