var keystone = require('keystone');
const configFile = process.env.NODE_ENV || 'local';

const ENV = require('dotenv').config({ path: `./env/.${configFile}` });
exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'blog';
	locals.moment = require('moment');
	locals.filters = {
		post: req.params.post,
	};
	locals.data = {
		posts: [],
	};
	locals.domain = ENV.parsed.HST;
	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Post')
			.model
			.findOne({
				_id: req.params.post
			})
			.populate('author categories tags');

		q.exec(function (err, result) {
			locals.data.post = result;
			next(err);
		});

	});

	// Load other posts
	// view.on('init', function (next) {
	//
	// 	var q = keystone.list('Post').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');
	//
	// 	q.exec(function (err, results) {
	// 		locals.data.posts = results;
	// 		next(err);
	// 	});
	//
	// });

	// Render the view
	view.render('post');
};
