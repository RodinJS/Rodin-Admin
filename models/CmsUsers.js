const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * CmsUsers Model
 * ==========
 */
const CmsUsers = new keystone.List('cms_users');

CmsUsers.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
CmsUsers.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
CmsUsers.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
CmsUsers.defaultColumns = 'name, email, isAdmin';
CmsUsers.register();
