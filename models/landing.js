const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Page Model
 * ==========
 */

const Page = new keystone.List('cms_landing', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Page.add({
	title: { type: String, required: true, default:'Some title it will not show on website' },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, required:true, default:Date.now(), dependsOn: { state: 'published' } },

	section1Title:{type:String, default:'THE FASTEST WAY TO BUILD INTERACTIVE VR EXPERIENCES'},
	section1SubTitle:{type:String, default:'Build once and deploy everywhere'},

	section2Title:{type:String, default:`KNOW JAVASCRIPT? YOU'RE ALL SET.`},
	section2SubTitle:{type:String, default:`Benefits of using Rodin`},

	section2Block1Title:{type:String, default:'JAVASCRIPT'},
	section2Block1Description:{type: Types.Html, wysiwyg: false},

	section2Block2Title:{type:String, default:'MULTIPLATFORM'},
	section2Block2Description:{type: Types.Html, wysiwyg: false},

	section2Block3Title:{type:String, default:'EXTENSIBLE'},
	section2Block3Description:{type: Types.Html, wysiwyg: false},

	section3Title:{type:String, default:'CHECK OUT OUR DOCS & GUIDES'},

	section4Title:{type:String, default:'FEATURES'},

	section4Block1Title:{type:String, default:'Easy Editing'},
	section4Block1Description:{type: Types.Html, wysiwyg: false},

	section4Block2Title:{type:String, default:'Easy Development'},
	section4Block2Description:{type: Types.Html, wysiwyg: false},

	section4Block3Title:{type:String, default:'Easy Maintenance'},
	section4Block3Description:{type: Types.Html, wysiwyg: false},

	section5Title:{type:String, default:'OUR VISION'},
	section5Video1Title:{type:String, default:'See what’s possible with Rodin'},
	section5Video1Embed:{type:String, default:'vW1cniBqE_k'},
	section5Video2Title:{type:String, default:'Build native VR apps for multiple platforms'},
	section5Video2Embed:{type:String, default:'7qhusC1KSg4'},
	section5Video3Title:{type:String, default:'Everything you need to deploy great VR apps'},
	section5Video3Embed:{type:String, default:'7qhusC1KSg4'},

	section6Title:{type:String, default:'DEVELOPERS FROM DIFFERENT COMPANIES TRUST RODIN'}

	//categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

Page.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Page.defaultColumns = 'title, state|20%, publishedDate|20%';
Page.register();
