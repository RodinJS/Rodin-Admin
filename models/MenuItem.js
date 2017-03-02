const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Product Model
 */
const MenuItem = new keystone.List('cms_menuitem', {
	autokey: {path: 'slug', from: 'name', unique: true},
	defaultColumns: 'name, key, menus, href, active'
});

MenuItem.add({
	name: {type: String, required: true},
	slug: {type: String, readonly: true},
	href: {type: Types.Url, required: true, initial: true},
	active: {type: Boolean, default: true}
});

MenuItem.register();
