var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: {name: 'title'},
	autokey: {path: 'slug', from: 'title', unique: true},
});

Post.add({
	title: {type: String, required: true},
	link: {type: String},
	state: {type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true},
	author: {type: Types.Relationship, ref: 'cms_users', index: true},
	publishedDate: {type: Types.Date, index: true, dependsOn: {state: 'published'}, default: Date.now},
	image: {type: Types.CloudinaryImage, label : 'image size > 472x316'},
	tags: {type: Types.Relationship, ref: 'Tags', many: true},
	content: {
		brief: {type: Types.Html, wysiwyg: true, height: 150},
		extended: {type: Types.Html, wysiwyg: true, height: 400},
	},
	categories: {type: Types.Relationship, ref: 'PostCategory', many: true},
});


Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
