/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
const _ = require('lodash');
var keystone = require('keystone');

const KeystoneMenus = require('keystone-menus');
const configFile = process.env.NODE_ENV || 'local';

const ENV = require('dotenv').config({ path: `./env/.${configFile}` });


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
    var view = new keystone.View(req, res);
    let cookies = parseCookies(req);
    res.locals.isAuthenticated = !!(cookies['token']);

    var q = keystone.list('cms_menu').model.aggregate([{ $unwind: { path: "$items", "preserveNullAndEmptyArrays": true } }, {
        $lookup: {
            "from": "cms_menuitems",
            "localField": "items",
            "foreignField": "_id",
            "as": "menuitem"
        }
    }, { $unwind: { path: "$menuitem", "preserveNullAndEmptyArrays": true } }, {
        $group: {
            _id: "$_id",
            slug: { "$first": "$slug" },
            name: { "$first": "$name" },
            href: { "$first": "$href" },
            state: { "$first": "$state" },
            position: { "$first": "$position" },
            items: { "$push": "$items" },
            menuitems: { "$push": "$menuitem" }
        }
    }])

    q.exec(function (err, result) {
        if (err) {
            next(err);
        }
        res.locals.menusList = result;
        res.locals.hidden = req.url.startsWith('/blog'); res.locals.navLinks = [
            { label: 'Home', key: 'home', href: '/' },
            { label: 'Blog', key: 'blog', href: '/blog' },
            { label: 'Gallery', key: 'gallery', href: '/gallery' },
            { label: 'Contact', key: 'contact', href: '/contact' },
        ];
        res.locals.user = req.user;
        res.locals.HST = ENV.parsed.HST;
        res.locals.blog_url = ENV.parsed.BLOG_URL;
        res.locals.current = req.url;
        next()

    });
};


/**
    Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
    var flashMessages = {
        info: req.flash('info'),
        success: req.flash('success'),
        warning: req.flash('warning'),
        error: req.flash('error'),
    };
    res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
    next();
};


/**
    Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
    if (!req.user) {
        req.flash('error', 'Please sign in to access this page.');
        res.redirect('/keystone/signin');
    } else {
        next();
    }
};
/**
 * parse cookies
 * @param {*} request 
 */
function parseCookies(request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function (cookie) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}