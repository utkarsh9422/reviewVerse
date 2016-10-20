'use strict';
// Declare app level module which depends on filters, and services

var app = angular.module('gascoApp', ['ngRoute', 'ngMessages', 'pascalprecht.translate', 'ui.bootstrap', 'ngMap', 'ngStorage', 'satellizer','ngFileUpload']);

app.config(['$routeProvider', '$httpProvider', '$authProvider',
    function($routeProvider, $activityIndicatorProvider, $httpProvider, $authProvider) {
        $routeProvider.when('/login', {// for first login
            templateUrl: 'views/PRTL_login.html',
            controller: 'loginController'
        });
        $routeProvider.when('/home', {// for first login
            templateUrl: 'views/PRTL_home.html',
            controller: 'homeController'
        });
        $routeProvider.when('/restaurant', {
            templateUrl: 'views/PRTL_restaurant.html',
            controller: 'restaurantController'
        });
        $routeProvider.when('/topic', {
            templateUrl: 'views/PRTL_topic.html',
            controller: 'topicController'
        });
        $routeProvider.otherwise({
            redirectTo: '/login'
        });
        
        
        


        function run($rootScope, $location, authentication) {
            $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
                if ($location.path() === '/home' && !authentication.isLoggedIn()) {
                    $location.path('/');
                }
            });
        }

        app.run(['$rootScope', '$location', 'authentication', run]);

    }]);