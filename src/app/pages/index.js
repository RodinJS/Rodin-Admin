/**
 * Created by kh.levon98 on 14-Sep-16.
 */
import angular from 'angular/index';

import './auth/index';

import './error/index';

import './dashboard/index';

import './user/index';

import './home/index';


// Create the module where our functionality can attach to
let pagesModule = angular.module('app.pages', [
    'landing.auth',
    'landing.error',
    'landing.home',
    'app.dashboard',
    'app.user',
]);

export default pagesModule;
