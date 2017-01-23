module.exports = function PostModel(client) {

	this.all = function() {
		var query = client.query("SELECT * FROM posts_post");
		return query;
	};

	this.get = function(id) {
		var query = client.query("SELECT * FROM posts_post WHERE id = $1", [id]);
		return query;
	};

	this.getTags = function(id) {
		var query = client.query(`
			SELECT tag_id, title
			FROM posts_post_tag
			JOIN posts_tag ON tag_id = posts_tag.id 
			WHERE post_id = $1
			`, [id]);
		return query;
	};

	this.filter = function(tagTitle) {
		var query = client.query(`
			SELECT 
				posts_post.title, 
				posts_post.content, 
				posts_post.id,
				posts_post.read_time,
				posts_post.created,
				posts_post.image
			FROM posts_post
			JOIN posts_post_tag ON posts_post.id = posts_post_tag.post_id
			JOIN posts_tag ON posts_post_tag.tag_id = posts_tag.id 
			WHERE posts_tag.title = $1
			`, [tagTitle]);
		return query;
	}
}

