'use strict';
// Declare app level module which depends on filters, and services

var app = angular.module('gascoApp', ['ngRoute', 'ngMessages', 'pascalprecht.translate', 'ui.bootstrap', 'ngMap']);

app.config(['$routeProvider',
function($routeProvider, $activityIndicatorProvider) {

	$routeProvider.when('/login', {// for first login
		templateUrl : 'views/PRTL_login.html',
		controller : 'loginController'
	});
	$routeProvider.when('/restaurant', {
		templateUrl : 'views/PRTL_restaurant.html',
		controller : 'restaurantController'
	});
	$routeProvider.when('/register', {
		templateUrl : 'views/PRTL_register.html',
		controller : 'registerController'
	});
	$routeProvider.when('/changePassword', {
		templateUrl : 'views/PRTL_changePassword.html',
		controller : 'changePasswordController'
	});
	$routeProvider.otherwise({
		redirectTo : '/login'
	});

}]);

app.config(['$translateProvider',
function($translateProvider) {

	$translateProvider.useStaticFilesLoader({
		prefix : 'translations/',
		suffix : '.json'
	}).preferredLanguage('en').useMissingTranslationHandlerLog();

}]);

app.run(['$rootScope', 'sharedService', '$location',
function($rootScope, sharedService, $location) {
	$rootScope.lang = 'en';

	$rootScope.default_float = 'right';
	$rootScope.opposite_float = 'left';

	$rootScope.default_direction = 'rtl';
	$rootScope.opposite_direction = 'ltr';

	if (sharedService.isLoggedIn()) {//for logged in user the default page is dashboard
		console.log('DENY');
		
		$location.path('/dashboard');
	} else {
		console.log('ALLOW');
		$location.path('/profileSelection');
	}

}]);

