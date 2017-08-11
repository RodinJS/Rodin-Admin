/**
 * Created by Reinchard on 8/9/2017.
 */
var keystone = require('keystone');

/**
 * PageCategory Model
 * ==================
 */

var PageCategory = new keystone.List('PageCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

PageCategory.add({
	name: { type: String, required: true },
});

PageCategory.relationship({ ref: 'cms_pages', path: 'categories' });

PageCategory.register();
