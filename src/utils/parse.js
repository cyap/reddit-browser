function jsonToPosts(json) {
	let rawPosts = JSON.parse(json).data.children;
	let posts = rawPosts.map(post => {
		return {
			title: post.data.title,
			author: post.data.author,
			score: post.data.score
		}
	})
	return posts;
}

export default jsonToPosts;