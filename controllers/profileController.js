module.exports = function(app){
var profiles = require('../models/profile').profiles;


	app.get('/profile', function(req, res){
		var profile = profiles.profiles[0];

		context = {
			profile: profile,
		}

		res.render('profile', context);
	})
};