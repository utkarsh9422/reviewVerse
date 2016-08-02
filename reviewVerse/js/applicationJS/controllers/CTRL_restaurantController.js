app.controller('restaurantController', [
    '$scope', 'posts', '$http', '$templateCache',
    function($scope, posts, $http) {

        $scope.user = "Anurag Parihar";
        $scope.test = 'Hi Guys';
//$http.get("http://api.geonames.org/earthquakesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&username=demo")
//    .then(function(response) {
//        $scope.to = response.data;
//    }); 
        $http({method: 'GET', url: "http://ec2-52-66-112-123.ap-south-1.compute.amazonaws.com:3000/categories"}).
                then(function(response) {
                    $scope.status = response.status;
                    $scope.to = response.data;
                }, function(response) {
                    $scope.to= response.data || "Request failed";
                    $scope.status = response.status;
                });
        $scope.addTopic = function() {
            //use $.param jQuery function to serialize data from JSON 
            var data = {
                name: $scope.newName,
                description: $scope.newDescription
            };

            var config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            $http.post("http://ec2-52-66-112-123.ap-south-1.compute.amazonaws.com:3000/topics",{'name': $scope.newName,'description': $scope.newDescription})
                    .success(function(response) {
                        $scope.message = "Happy";
                    });

        };





//  $scope.topics = [
//  {topicId:'1',title: 'Beautiful Restaurant',topic: 'Beautiful Restaurant', upvotes: 5, rating:1, image:'img/restaurant1.jpg',
//      reviews: [
//    {reviewId:'11',topicId:'1',author: 'Joe', body: 'Cool post!', reviewUpvotes: 6, reviewRating:1},
//    {reviewId:'12',topicId:'1',author: 'Bob', body: 'Great idea but everything is wrong!', reviewUpvotes: 2,reviewRating:1}
//  ]},
//  {topicId:'2',title: 'Gareeb Dhaba',topic: 'Beautiful Restaurant', upvotes: 2, rating:2, image:'img/restaurant2.jpg',
//   reviews: [
//    {reviewId:'21',topicId:'2',author: 'Joe', body: 'Cool post!', reviewUpvotes: 6,reviewRating:1},
//    {reviewId:'22',topicId:'2',author: 'Bob', body: 'Great idea but everything is wrong!', reviewUpvotes: 2,reviewRating:1}
//  ]},
//  {topicId:'3',title: 'Sexy Restaurant',topic: 'Beautiful Restaurant', upvotes: 15, rating:3, image:'img/restaurant3.jpg',
//   reviews: [
//    {reviewId:'31',topicId:'3',author: 'Joe', body: 'Cool post!', reviewUpvotes: 6,reviewRating:1},
//    {reviewId:'32',topicId:'3',author: 'Bob', body: 'Great idea but everything is wrong!', reviewUpvotes: 2,reviewRating:1}
//  ]},
//  {topicId:'4',title: 'New Restaurant',topic: 'Beautiful Restaurant', upvotes: 9,rating:4, image:'img/restaurant4.jpg',
//   reviews: [
//    {reviewId:'41',topicId:'4',author: 'Joe', body: 'Cool post!', reviewUpvotes: 6,reviewRating:1},
//    {reviewId:'42',topicId:'4',author: 'Bob', body: 'Great idea but everything is wrong!', reviewUpvotes: 2,reviewRating:1}
//  ]},
//  {topicId:'5',title: 'Purana Restaurant',topic: 'Beautiful Restaurant', upvotes: 4,rating:5, image:'img/restaurant2.jpg',
//   reviews: [
//    {reviewId:'51',topicId:'5',author: 'Joe', body: 'Cool post!', reviewUpvotes: 6,reviewRating:1},
//    {reviewId:'52',topicId:'5',author: 'Bob', body: 'Great idea but everything is wrong!', reviewUpvotes: 2,reviewRating:1}
//  ]}
//];
//
//$scope.addTopic = function(){
//    if(!$scope.newTitle || $scope.newTitle === '') { return; }
//  $scope.topics.push({title: $scope.newName,topic:$scope.newDescription, upvotes: 0, rating:1,image: $scope.newImage});
//};
        $scope.incrementUpvotes = function(post) {
            post.upvotes += 1;
        };
        $scope.rating = 1;

        $scope.rateFunction = function(rating) {
        };
        $scope.IsHidden = true;
        $scope.ShowHide = function() {
            //If DIV is hidden it will be visible and vice versa.
            $scope.IsHidden = $scope.IsHidden ? false : true;
        };
        $scope.addReview = function() {
            if ($scope.body === '') {
                return;
            }
            yo = $scope.body;
            $scope.topics.reviews.push({
                body: yo
            });
            $scope.body = '';
        };
//
//$scope.openNewTopic = function() {
//		var modalInstance = $modal.open({
//			templateUrl : 'views/PRTL_postTopic.html',
//			controller : 'restaurantController'
//		});}

    }]
        ).directive('starRating',
        function() {
            return {
                restrict: 'A',
                template: '<ul class="rating">'
                        + '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
                        + '\u2605'
                        + '</li>'
                        + '</ul>',
                scope: {
                    ratingValue: '=',
                    max: '=',
                    onRatingSelected: '&'
                },
                link: function(scope, elem, attrs) {
                    var updateStars = function() {
                        scope.stars = [];
                        for (var i = 0; i < scope.max; i++) {
                            scope.stars.push({
                                filled: i < scope.ratingValue
                            });
                        }
                    };

                    scope.toggle = function(index) {
                        scope.ratingValue = index + 1;
                        scope.onRatingSelected({
                            rating: index + 1
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
