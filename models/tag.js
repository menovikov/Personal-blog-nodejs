function TagModel(client){
	this.all = function(id) {
		var query = client.query("SELECT * FROM posts_tag");
		return query;
	}
	this.get = function(id) {
		var query = client.query("SELECT * FROM posts_tag WHERE id = $1", [id]);
		return query;
	}
	this.filter = function(id) {
		var query = client.query(`
			SELECT * FROM posts_tag 
			WHERE id = $1
			JOIN posts_post ON id = posts_post.id`, [id]);
		return query;
	}
}
module.exports = {
	TagModel: TagModel,
}