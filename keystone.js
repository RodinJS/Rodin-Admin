// Simulate config options from your production environment by
// customising the .env file in your project's root folder.

const configFile = process.env.NODE_ENV || 'local';

require('dotenv').config({ path: `./env/.${configFile}` });

// Require keystone
const keystone = require('keystone');
const jwt = require('jsonwebtoken');
const JWTSECRET = '4DNSrMPuQ3Y3McBu96wd2GzGheDXuft8gDqLEQVWHnXQfcaGFtM2ZBgyNYzPN7CK';


// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'Rodin CMS',
	'brand': 'Rodin CMS',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'cms_users',
	'wysiwyg images': true,
	'wysiwyg cloudinary images': true,
	'wysiwyg additional plugins': "media",
	'wysiwyg additional buttons': 'media mediamebed',
	'wysiwyg additional options': {
		'external_plugins': {
			'uploadimage': '/js/uploadimage/plugin.min.js',
			'charactercount': '/js/charcount/plugin.min.js',
		},
	},
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	galleries: 'galleries',
	enquiries: 'enquiries',
	'cms_users': 'cms_users',
	'cms_menus': ['cms_menus', 'cms_menuitems'],
});
/*
 keystone.set('signin redirect', (user, req, res) =>{

 jwt.sign({ //jwt.verify
 username: user.username,
 role: user.role,
 random: user.password.slice(-15)
 }, JWTSECRET, {
 expiresIn: "1m"
 });

 console.log(user);
 /!*var url = (user.isAdmin) ? '/keystone' : '/whatever/url/you/want';
 res.redirect(url);*!/
 });
 */

// Start Keystone to connect to your database and initialise the web server


console.log('ENV', configFile);
keystone.start();
