function PostModel(client){
	this.all = function(id) {
		var query = client.query("SELECT * FROM posts_post");
		return query;
	}
	this.get = function(id) {
		var query = client.query("SELECT * FROM posts_post WHERE id = $1", [id]);
		return query;
	}
	this.getTags = function(id) {
		var query = client.query(`
			SELECT tag_id, title
			FROM posts_post_tag
			JOIN posts_tag ON tag_id = posts_tag.id 
			WHERE post_id = $1
			`, [id]);
		return query;
	}
	this.filter = function(tagTitle) {
		var query = client.query(`
			SELECT tag_id, title
			FROM posts_post_tag
			JOIN posts_tag ON tag_id = posts_tag.id 
			WHERE post_id = $1
			`, [id]);
		return query;
	}
}
module.exports = {
	PostModel : PostModel,
}

