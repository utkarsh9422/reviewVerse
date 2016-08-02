'use strict';
// Declare app level module which depends on filters, and services

var app = angular.module('gascoApp', ['ngRoute', 'ngMessages', 'pascalprecht.translate', 'ui.bootstrap', 'ngMap']);

app.config(['$routeProvider',
function($routeProvider, $activityIndicatorProvider) {

	$routeProvider.when('/restaurant', {
		templateUrl : 'views/PRTL_restaurant.html',
		controller : 'restaurantController'
	});
	$routeProvider.when('/login', {// for first login
		templateUrl : 'views/PRTL_login.html',
		controller : 'loginController'
	});
	$routeProvider.otherwise({
		redirectTo : '/restaurant'
	});

}]);

