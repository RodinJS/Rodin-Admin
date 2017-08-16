const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Menu Mongoose Model
 */
const Menu = new keystone.List('cms_menu', {
    autokey: { path: 'slug', from: 'name', unique: true },
    defaultColumns: 'name',
});

Menu.add({
    name: { type: String, required: true },
    slug: { type: String, readonly: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    items: { type: Types.Relationship, ref: 'cms_menuitem', many: true },
    href: { type: Types.Url, initial: true },
    active: { type: Boolean, default: true },
    position: { type: Number }
});

Menu.defaultColumns = 'name, slug|20%, state|20%, position|20%';
Menu.register();