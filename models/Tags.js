/**
 * Created by Reinchard on 7/8/2017.
 */
var keystone = require('keystone');

/**
 * Tags Model
 * ==================
 */

var Tags = new keystone.List('Tags', {
	autokey: { from: 'name', path: 'slug', unique: true },
});

Tags.add({
	name: { type: String, required: true },
});

Tags.relationship({ ref: 'Post', path: 'tags' });

Tags.register();

