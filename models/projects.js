const keystone = require('keystone');
const Types = keystone.Field.Types;
const request =  require('request');
const env = require('dotenv').config({path:`./env/.${process.NODE_ENV || 'local'}`});
/**
 * Page Model
 * ==========
 */

const Projects = new keystone.List('projects', {
	map: { name: 'name'},
});

Projects.add({
	state: { type: Types.Select, options: 'pending, approved, rejected', default: 'pending', index: true },
	name: { type: String, index: true, required: true },
	root: { type: String, readonly: true, noedit:true},
	owner: { type: String, readonly: true, noedit:true},
	displayName: { type: String, required: true, default:''},
	domain: { type: String, },
	description: { type: Types.Html, wysiwyg:false, height: 150, required: true, default:''},
	updatedAt: { type: Types.Date, readonly: true, noedit:true},
	createdAt: { type: Types.Date, readonly:true, noedit:true},
	public: { type: Types.Boolean},
	publishedPublic:{type: Types.Boolean, noedit:true},
	publishDate: { type: Types.Date, readonly:true, noedit:true},

});

Projects.defaultColumns = 'name, root, owner, updatedAt, state';
Projects.register();
