module.exports = function(app){

const fs = require('fs');
const util = require('util');
const client = require('../models/database');
const PostModel = require('../models/post');
const TagModel = require('../models/tag');

var pm = new PostModel(client);
var tag = new TagModel(client);

	function deviceDetect(req){
		if (req.device.type === 'desktop'){
			return 'desktop';
		} else {
			return 'mobile';
		};
	};


	app.get('/', function(req, res){
		res.redirect('/blog');
	});


	app.get('/blog', function(req, res){

		var device = deviceDetect(req);		
		var tagTitle = req.query.tag;
		var posts = [];
		var q;

		if (typeof(tagTitle) != 'undefined'){
			q = pm.filter(tagTitle);
		} else {
			q = pm.all();
		};


		q.on('row', function(cursor){
			posts.push(cursor);
		});

		q.on('end', () => {
			var itemsProcessed = 0;

			posts.forEach((item) => {
				var tags = [];
				var qt = pm.getTags(item.id);

				qt.on('row', function(cursor){
					tags.push(cursor);
				});

				qt.on('end', () => {
					item.tags = tags;
					itemsProcessed += 1;

					if (itemsProcessed === posts.length){
						var context = {
							posts : posts,
							device: device,
						};
						res.render('postLIst', context);
					};
				});
			});	
		});	
	});

	app.get('/blog/:id', function(req, res, next) {

		if (req.params.id === 'more'){
			next();
		}

		var id = req.params.id;
		var device = deviceDetect(req);
		var q = pm.get(id);
		var post;

		q.on('row', function(row) {
			post = row;
		});

		q.on('end', () =>{
			var qt = pm.getTags(id);
			var tags = [];

			qt.on('row', function(cursor) {
				console.log('one tag found')
				tags.push(cursor);
			});

			qt.on('end', () => {
				console.log('tag search ended')
				post.tags = tags;
				var context = {
					post : post,
					device: device,
				};
				res.render('postDetails', context);
			});
		});
		
	});

	app.get('/blog/more/', (req, res) => {

		var welcomePhrase = 'Hi there';
		var email = 'mail@maxnovikov.com';
		var device = deviceDetect(req);

		context = {
			welcomePhrase: welcomePhrase,
			email: email,
			device: device,
		}
		res.render('learnMore', context);
	});

};