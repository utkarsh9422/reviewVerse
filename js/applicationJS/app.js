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
		redirectTo : '/login'
	});
        
}]);

//app.controller('homeCtrl', [
//'$scope','$modal','posts',
//function($scope,$modal,posts){
//  $scope.test = 'Hi Guys';
//  $scope.posts = posts.posts;
//  $scope.posts = [
//  {topicId:'1',title: 'Beautiful Restaurant',topic: 'Beautiful Restaurant', upvotes: 5, rating:1, image:'img/restaurant1.jpg',
//      comments: [
//    {reviewId:'11',topicId:'1',author: 'Joe', body: 'Cool post!', upvotes: 6},
//    {reviewId:'12',topicId:'1',author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 2}
//  ]},
//  {topicId:'2',title: 'Gareeb Dhaba',topic: 'Beautiful Restaurant', upvotes: 2, rating:2, image:'img/restaurant2.jpg',
//   comments: [
//    {reviewId:'21',topicId:'2',author: 'Joe', body: 'Cool post!', upvotes: 6},
//    {reviewId:'22',topicId:'2',author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 2}
//  ]},
//  {topicId:'3',title: 'Sexy Restaurant',topic: 'Beautiful Restaurant', upvotes: 15, rating:3, image:'img/restaurant3.jpg',
//   comments: [
//    {reviewId:'31',topicId:'3',author: 'Joe', body: 'Cool post!', upvotes: 6},
//    {reviewId:'32',topicId:'3',author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 2}
//  ]},
//  {topicId:'4',title: 'New Restaurant',topic: 'Beautiful Restaurant', upvotes: 9,rating:4, image:'img/restaurant4.jpg',
//   comments: [
//    {reviewId:'41',topicId:'4',author: 'Joe', body: 'Cool post!', upvotes: 6},
//    {reviewId:'42',topicId:'4',author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 2}
//  ]},
//  {topicId:'5',title: 'Purana Restaurant',topic: 'Beautiful Restaurant', upvotes: 4,rating:5, image:'img/restaurant2.jpg',
//   comments: [
//    {reviewId:'51',topicId:'5',author: 'Joe', body: 'Cool post!', upvotes: 6},
//    {reviewId:'52',topicId:'5',author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 2}
//  ]}
//];
//$scope.comments=[{reviewId:'11',topicId:'1',author: 'Joe', body: 'Cool post!', upvotes: 6},
//    {reviewId:'12',topicId:'1',author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 2}],
//    [
//    {reviewId:'21',topicId:'2',author: 'Joe', body: 'Cool post!', upvotes: 6},
//    {reviewId:'22',topicId:'2',author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 2}];
//$scope.addPost = function(){
//    if(!$scope.newTitle || $scope.newTitle === '') { return; }
//  $scope.posts.push({title: $scope.newTitle,topic:$scope.newTopic, upvotes: 0, rating:1,image: $scope.newImage});
//};
//$scope.incrementUpvotes = function(post) {
//  post.upvotes += 1;
//};
//$scope.rating = 1;
//    $scope.rateFunction = function(rating) {
//    };
//    $scope.IsHidden = true;
//            $scope.ShowHide = function () {
//                //If DIV is hidden it will be visible and vice versa.
//                $scope.IsHidden = $scope.IsHidden ? false : true;
//            };
//    $scope.addComment = function(){
//  if($scope.body === '') { return; }
//  $scope.post.comments.push({
//    body: $scope.body,
//    author: 'user',
//    upvotes: 0
//  });
//  $scope.body = '';
//};
//}]
//) .directive('starRating',
//	function() {
//		return {
//			restrict : 'A',
//			template : '<ul class="rating">'
//					 + '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
//					 + '\u2605'
//					 + '</li>'
//					 + '</ul>',
//			scope : {
//				ratingValue : '=',
//				max : '=',
//				onRatingSelected : '&'
//			},
//			link : function(scope, elem, attrs) {
//				var updateStars = function() {
//					scope.stars = [];
//					for ( var i = 0; i < scope.max; i++) {
//						scope.stars.push({
//							filled : i < scope.ratingValue
//						});
//					}
//				};
//				
//				scope.toggle = function(index) {
//					scope.ratingValue = index + 1;
//					scope.onRatingSelected({
//						rating : index + 1
//					});
//				};
//				
//				scope.$watch('ratingValue',
//					function(oldVal, newVal) {
//						if (newVal) {
//							updateStars();
//						}
//					}
//				);
//			}
//		};
//	}
//);
//
//app.state('posts', {
//  url: '/posts/{id}',
//  templateUrl: '/posts.html',
//  controller: 'PostsCtrl'
//});
////app.config(['$translateProvider',
////function($translateProvider) {
////
////	$translateProvider.useStaticFilesLoader({
////		prefix : 'translations/',
////		suffix : '.json'
////	}).preferredLanguage('en').useMissingTranslationHandlerLog();
////
////}]);
//
//app.run(['$rootScope', 'sharedService', '$location',
//function($rootScope, sharedService, $location) {
//	$rootScope.lang = 'en';
//
//	$rootScope.default_float = 'right';
//	$rootScope.opposite_float = 'left';
//
//	$rootScope.default_direction = 'rtl';
//	$rootScope.opposite_direction = 'ltr';
//
//	if (sharedService.isLoggedIn()) {//for logged in user the default page is dashboard
//		console.log('DENY');
//		
//		$location.path('/dashboard');
//	} else {
//		console.log('ALLOW');
//		$location.path('/profileSelection');
//	}
//
//}]);
////PostController
//app.controller('PostsCtrl', [
//'$scope',
//'$stateParams',
//'posts',
//function($scope, $stateParams, posts){
//$scope.post = posts.posts[$stateParams.id];
//$scope.addComment = function(){
//  if($scope.body === '') { return; }
//  $scope.post.comments.push({
//    body: $scope.body,
//    author: 'user',
//    upvotes: 0
//  });
//  $scope.body = '';
//};
//}]);