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
	title: { type: String, required: true, default: 'Some title it will not show on website' },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: {
		type: Types.Date,
		index: true,
		required: true,
		default: Date.now(),
		dependsOn: { state: 'published' },
	},

	section1Title: { type: String, default: 'THE FASTEST WAY TO BUILD INTERACTIVE VR EXPERIENCES' },
	section1SubTitle: { type: String, default: 'Build once and deploy everywhere' },


	section2Title: { type: String, default: 'RODIN HOME' },
	section2SubTitle: { type: String, default: 'All the experiences built by Rodin' },

	section3Title: { type: String, default: `KNOW JAVASCRIPT? YOU'RE ALL SET.` },
	section3SubTitle: { type: String, default: `How it works` },

	section3Block1Title: { type: Types.Html, default: 'Code or customize a template using Rodin JS library', wysiwyg: true },
	section3Block1Description: { type: Types.Html, wysiwyg: true },

	section3Block2Title: { type: Types.Html, default: 'Use Rodin Home to test your code on all devices.', wysiwyg: true },
	section3Block2Description: { type: Types.Html, wysiwyg: true },

	section3Block3Title: { type: Types.Html, default: 'Build and publish your apps', wysiwyg: true },
	section3Block3Description: { type: Types.Html, wysiwyg: true },

	section3Block4Title: {
		type: Types.Html,
		default: 'Enjoy your VR experiences from any device using the built apps or a browser!', wysiwyg: true,
	},
	section3Block4Description: { type: Types.Html, wysiwyg: true },

	section4Title: { type: String, default: 'BENEFITS OF USING RODIN' },
	section4SubTitle: { type: String, default: '' },

	section4Block1Title: { type: String, default: 'TECHNOLOGY' },
	section4Block1Description: { type: Types.Html, wysiwyg: false },

	section4Block2Title: { type: String, default: 'MULTIPLATFORM' },
	section4Block2Description: { type: Types.Html, wysiwyg: false },

	section4Block3Title: { type: String, default: 'EXTENSIBLE' },
	section4Block3Description: { type: Types.Html, wysiwyg: false },

	section5Title: { type: String, default: 'CHECK OUT OUR DOCS & GUIDES' },

	section6Title:{type:String, default:'FEATURES'},

	section6Block1Title:{type:String, default:'Easy Editing'},
	section6Block1Description:{type: Types.Html, wysiwyg: false},

	section6Block2Title:{type:String, default:'Easy Development'},
	section6Block2Description:{type: Types.Html, wysiwyg: false},

	section6Block3Title:{type:String, default:'Easy Maintenance'},
	section6Block3Description:{type: Types.Html, wysiwyg: false},
	
	
	section7Title: { type: String, default: 'OUR VISION' },
	section7Video1Title: { type: String, default: 'See what’s possible with Rodin' },
	section7Video1Embed: { type: String, default: 'vW1cniBqE_k' },
	section7Video2Title: { type: String, default: 'Build native VR apps for multiple platforms' },
	section7Video2Embed: { type: String, default: '7qhusC1KSg4' },
	section7Video3Title: { type: String, default: 'Everything you need to deploy great VR apps' },
	section7Video3Embed: { type: String, default: '7qhusC1KSg4' },

	section8Title: { type: String, default: 'DEVELOPERS FROM DIFFERENT COMPANIES TRUST RODIN' },

	// categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

Page.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Page.defaultColumns = 'title, state|20%, publishedDate|20%';
Page.register();


// section3Block1Title: {type: String, default: 'JAVASCRIPT'},
// section3Block1Description: {type: Types.Html, wysiwyg: false},
//

