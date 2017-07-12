var keystone = require('keystone');
var async = require('async');
const configFile = process.env.NODE_ENV || 'local';

const ENV = require('dotenv').config({ path: `./env/.${configFile}` });
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.moment = require('moment');
	locals.section = 'blog';
	locals.filters = {
		tag: req.params.tag,
	};
	locals.data = {
		posts: [],
		categories: [],
	};
	locals.apiRoute = ENV.parsed.API;
	// Load all categories
	// view.on('init', function (next) {
	// 	keystone.list('PostCategory').model.find().sort('name').exec(function (err, results) {
    //
	// 		if (err || !results.length) {
	// 			return next(err);
	// 		}
    //
	// 		locals.data.categories = results;
    //
	// 		// Load the counts for each category
	// 		async.each(locals.data.categories, function (category, next) {
    //
	// 			keystone.list('Post').model.count().where('categories').in([category.id]).exec(function (err, count) {
	// 				category.postCount = count;
	// 				next(err);
	// 			});
    //
	// 		}, function (err) {
	// 			next(err);
	// 		});
	// 	});
	// });

	// Load the current category filter
	view.on('init', function (next) {
		if (req.params.tag) {
			keystone.list('Tags').model.findOne({slug: locals.filters.tag.toLowerCase()}).exec(function (err, result) {
				locals.data.tag = result;
				next(err);
			});
		} else {
			next();
		}
	});

	// Load the posts
	view.on('init', function (next) {

		var q = keystone.list('Post').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
			filters: {
				state: 'published',
			},
		})
			.sort('-publishedDate')
			.populate('author categories tags');

		if (locals.data.tag) {
			q.where('tags').in([locals.data.tag]);
		}

		q.exec(function (err, results) {
			let random = [];
			let featured = [];
			results.results.map(post => {
				if (post.categories.length > 0) {
					return post.categories.map(ft => {
						if (ft.name === 'featured')
							featured.push(post)
					});
				} else {
					random.push(post)
				}
			});
			locals.data.posts = results;
			locals.data.posts = {
				featured,
				random,
			};
			next(err);
		});
	});

	// Render the view
	view.render('blog');
};
