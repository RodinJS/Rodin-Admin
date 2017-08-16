const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Product Model
 */
const MenuItem = new keystone.List('cms_menuitem', {
    autokey: { path: 'slug', from: 'name', unique: true },
    defaultColumns: 'name, key, menus, href, active'
});

MenuItem.add({
    name: { type: String, required: true },
    slug: { type: String, readonly: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    href: { type: Types.Url, required: true, initial: true },
    active: { type: Boolean, default: true },
    position: { type: Number },
    page: { type: Types.Relationship, ref: 'cms_pages' },
});
MenuItem.defaultColumns = 'name, slug|20%, state|20%, position|20%';
MenuItem.register();