app.controller("topicController", [
    '$scope', '$http', 'authentication', '$auth', '$location',
    function($scope, $http, authentication, $auth, $location) {

        //Get Particular Topic Detail
        $scope.getTopicDetails = function() {
            var topicId = localStorage.getItem('topicId');
            $http({method: 'GET',
                url: getTopics.concat(topicId)}).
                    then(function(response) {
                        $scope.status = response.status;
                        $scope.topicDetails = response.data;
                        alert(topicDetails);
                    }, function(response) {
                        $scope.topicDetails = response.data || "Request failed";
                        $scope.status = response.status;
                    });
        };
        $scope.getTopicDetails();

        //Get All Reviews For topic
        $scope.getTopicReviews = function() {
            var topicId = localStorage.getItem('topicId');
            $http({method: 'GET', url: getReviews.concat("?ownerTopicId=", topicId, "&sortBy=-created")}).
                    then(function(response) {
                        $scope.status = response.status;
                        $scope.topicReviews = response.data;
                    }, function(response) {
                        $scope.topicReviews = response.data || "Request failed";
                        $scope.status = response.status;
                    });
        };
        $scope.getTopicReviews();

        //Upvote Reviews
        $scope.incrementReviewUpvotes = function(reviewId) {
            $http({method: 'PUT',
                url: getReviews.concat(reviewId, "/upvote"),
                "async": true,
                "crossDomain": true,
            }).
                    then(function(response) {
                        console.log(response);
                        $scope.getTopicReviews();
                    }, function(response) {
                        console.log(error);
                    });
        };

        //Tabs
        $scope.tabs = function() {
            $(document).ready(function() {
                $('ul.tabs').tabs();
            });
        }
        $scope.tabs();
    }
]);

