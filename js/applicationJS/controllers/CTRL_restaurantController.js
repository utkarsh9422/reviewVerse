app.controller("restaurantController", [
    '$scope', '$http', 'authentication', '$auth','$location',
    function($scope, $http, authentication, $auth, $location) {
        $scope.isDisabled = false;
        $scope.user = "Anurag Parihar";
        $scope.test = 'Hi Guys';
        //Logout
        $scope.logout = function() {
            $auth.logout()
                    .then(function() {
                        alert('You have been logged out');
                        $location.path('/login');
                    });
        };
//Get Topics
        console.log(authentication.getjwtToken());
        $scope.getTopics = function() {
            var headers = {'Authorization': authentication.getjwtToken()};
            $http({method: 'GET',
                url: "http://ec2-52-66-112-123.ap-south-1.compute.amazonaws.com/topics",
                headers: headers}).
                    then(function(response) {
                        $scope.status = response.status;
                        $scope.topics = response.data;
                    }, function(response) {
                        $scope.topics = response.data || "Request failed";
                        $scope.status = response.status;
                    });
        };
        $scope.getTopics();
//Post Topics
        $scope.addTopic = function() {
            if ($scope.newName == "" || $scope.newDescription == "" || $scope.newcategory == "") {
                alert("Please fill in the required information.");
            }
            var data = {
                name: $scope.newName,
                description: $scope.newDescription,
                category: $scope.newCategory
            };

            var config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            $http.post("http://ec2-52-66-112-123.ap-south-1.compute.amazonaws.com/topics", data, config)
                    .success(function(response) {
                        alert("Topic Added");
                        $scope.getTopics();
                    });
        };
//Get Reviews
        $http({method: 'GET', url: "http://ec2-52-66-112-123.ap-south-1.compute.amazonaws.com/reviews"}).
                then(function(response) {
                    $scope.status = response.status;
                    $scope.reviews = response.data;
                }, function(response) {
                    $scope.reviews = response.data || "Request failed";
                    $scope.status = response.status;
                });

//Add Review
        $scope.addReview = function(topicId, newReview, reviewRating) {
            var data = {
                body: newReview,
                ownerTopicId: topicId,
                authorId: "User Name",
                rating: reviewRating
            };
            var url = "http://ec2-52-66-112-123.ap-south-1.compute.amazonaws.com/topics/".concat(topicId, "/reviews");
            var config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            $http.post(url, data, config)
                    .success(function(response) {
                        alert("Review Posted");
                    }).error(function(response) {
                alert("Failure");
            });
        };
//Topic Upvote          
        $scope.incrementUpvotes = function(topicId) {
            $scope.disable = function(topic) {
                return true;
            };
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://ec2-52-66-112-123.ap-south-1.compute.amazonaws.com/topics/".concat(topicId, "/upvote"),
                "method": "PUT",
                "headers": {
                    "cache-control": "no-cache",
                    "postman-token": "ea81dd57-50bf-93cc-d9cb-6d8535a8a39c"
                }
            }

            $.ajax(settings).done(function(response) {
                console.log(response);
                topic.upvotes++;
            });

        };
//Review Upvote
        $scope.incrementReviewUpvotes = function(reviewId) {
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://ec2-52-66-112-123.ap-south-1.compute.amazonaws.com/reviews/".concat(reviewId, "/upvote"),
                "method": "PUT",
                "headers": {
                    "cache-control": "no-cache",
                    "postman-token": "544e81c6-0332-5703-c91f-103d968ac32c"
                }
            }
            $.ajax(settings).done(function(response) {
                console.log(response);
                review.upvotes++;
            });
        };

        $scope.IsHidden = true;
        $scope.ShowHide = function() {
            //If DIV is hidden it will be visible and vice versa.
            $scope.IsHidden = $scope.IsHidden ? false : true;
        };
        $scope.reviewRating = {rating: 1};
    }]
        ).directive("starRating", function() {
    return {
        restrict: "EA",
        template: "<ul class='rating' ng-class='{readonly: readonly}'>" +
                "  <li ng-repeat='star in stars' ng-class='star' ng-click='toggle($index)'>" +
                "    <i class='fa fa-star'></i>" + //&#9733
                "  </li>" +
                "</ul>",
        scope: {
            ratingValue: "=ngModel",
            max: "=?", //optional: default is 5
            onRatingSelected: "&?",
            readonly: "=?"
        },
        link: function(scope, elem, attrs) {
            if (scope.max == undefined) {
                scope.max = 5;
            }
            function updateStars() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: (i < scope.ratingValue.rating)
                    });
                }
            }
            ;
            scope.toggle = function(index) {
                if (scope.readonly == undefined || scope.readonly == false) {
                    scope.ratingValue.rating = index + 1;
                    scope.onRatingSelected({
                        rating: index + 1
                    });
                }
            };
            scope.$watch("ratingValue.rating", function(oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    };
}).directive("averageStarRating", function() {
    return {
        restrict: "EA",
        template: "<div class='average-rating-container'>" +
                "  <ul class='rating background' class='readonly'>" +
                "    <li ng-repeat='star in stars' class='star'>" +
                "      <i class='fa fa-star'></i>" + //&#9733
                "    </li>" +
                "  </ul>" +
                "  <ul class='rating foreground' class='readonly' style='width:{{filledInStarsContainerWidth}}%'>" +
                "    <li ng-repeat='star in stars' class='star filled'>" +
                "      <i class='fa fa-star'></i>" + //&#9733
                "    </li>" +
                "  </ul>" +
                "</div>",
        scope: {
            averageRatingValue: "=ngModel",
            max: "=?", //optional: default is 5
        },
        link: function(scope, elem, attrs) {
            if (scope.max == undefined) {
                scope.max = 5;
            }
            function updateStars() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({});
                }
                var starContainerMaxWidth = 100; //%
                scope.filledInStarsContainerWidth = scope.averageRatingValue / scope.max * starContainerMaxWidth;
            }
            ;
            scope.$watch("averageRatingValue", function(oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    };
});