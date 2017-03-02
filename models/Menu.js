const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Menu Mongoose Model
 */
const Menu = new keystone.List('cms_menu', {
	autokey: {path: 'slug', from: 'name', unique: true},
	defaultColumns: 'name'
});

Menu.add({
	name: {type: String, required: true},
	slug: {type: String, readonly: true},
	items: {type: Types.Relationship, ref: 'cms_menuitem', many: true}
});

Menu.register();
