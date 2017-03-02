/**
 * Created by xgharibyan on 3/1/17.
 */

const keystone = require('keystone');
const Types = keystone.Field.Types;


/*
const Home = new keystone.Item('Home');




const homepage = new keystone.List('Homepage', {
	nocreate: true,
	nodelete: true,
	title: { type: String, required: true },
});

homepage.register();
*/

var Settings = new keystone.List('Settings', {
	nocreate: true,
	nodelete: true,
});
// Settings is a List with several options preset, you add fields to it as usual
Settings.add({ option: String });
Settings.register();
