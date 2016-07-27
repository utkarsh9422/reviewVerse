app.controller('restaurantController', [
'$scope',
function($scope){
  $scope.test = 'Hi Guys';
  $scope.posts = [
  {title: 'post 1', upvotes: 5, rating:1},
  {title: 'post 2', upvotes: 2, rating:2},
  {title: 'post 3', upvotes: 15, rating:3},
  {title: 'post 4', upvotes: 9,rating:4},
  {title: 'post 5', upvotes: 4,rating:5}
];
$scope.addPost = function(){
    if(!$scope.title || $scope.title === '') { return; }
  $scope.posts.push({title: $scope.title, upvotes: 0, rating:1});
  $scope.title = '';
};
$scope.incrementUpvotes = function(post) {
  post.upvotes += 1;
};
$scope.rating = 1;
    $scope.rateFunction = function(rating) {
    };
}]
) .directive('starRating',
	function() {
		return {
			restrict : 'A',
			template : '<ul class="rating">'
					 + '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
					 + '\u2605'
					 + '</li>'
					 + '</ul>',
			scope : {
				ratingValue : '=',
				max : '=',
				onRatingSelected : '&'
			},
			link : function(scope, elem, attrs) {
				var updateStars = function() {
					scope.stars = [];
					for ( var i = 0; i < scope.max; i++) {
						scope.stars.push({
							filled : i < scope.ratingValue
						});
					}
				};
				
				scope.toggle = function(index) {
					scope.ratingValue = index + 1;
					scope.onRatingSelected({
						rating : index + 1
					});
				};
				
				scope.$watch('ratingValue',
					function(oldVal, newVal) {
						if (newVal) {
							updateStars();
						}
					}
				);
			}
		};
	}
);
