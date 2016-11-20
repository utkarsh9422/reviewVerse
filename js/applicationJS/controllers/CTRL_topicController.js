app.controller("topicController", [
    '$scope', '$http', 'authentication', '$auth', '$location',
    function($scope, $http, authentication, $auth, $location) {
        
        $scope.myInterval=3000;
        $scope.getTopicDetails = function() {
                    //Get Particular Topic Detail
                    var topicId = localStorage.getItem('topicId');
            $http({method: 'GET',
                url: getTopics.concat(topicId)}).
                    then(function(response) {
                        $scope.status = response.status;
                        $scope.topicDetails = response.data;
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
        
//        Positive Reviews
        $scope.getPositiveReviews = function(topicId){
            var topicId = localStorage.getItem('topicId');
        $http({method: 'GET',
                url: getReviews.concat("?ownerTopicId=", topicId, "&sortBy=-rating") })
                    .then(function(response) {
                        $scope.status = response.status;
                        $scope.pReviews = response.data;
                    }, function(response) {
                        $scope.pReviews = response.data || "Request failed";
                        $scope.status = response.status;
                    });
        };
        $scope.getPositiveReviews();
        
        //        Negative Reviews
        $scope.getNegativeReviews = function(topicId){
            var topicId = localStorage.getItem('topicId');
        $http({method: 'GET',
                url: getReviews.concat("?ownerTopicId=", topicId, "&sortBy=rating") })
                    .then(function(response) {
                        $scope.status = response.status;
                        $scope.nReviews = response.data;
                    }, function(response) {
                        $scope.nReviews = response.data || "Request failed";
                        $scope.status = response.status;
                    });
        };
        $scope.getNegativeReviews();
        
        //        Latest Reviews
        $scope.getLatestReviews = function(topicId){
            var topicId = localStorage.getItem('topicId');
        $http({method: 'GET',
                url: getReviews.concat("?ownerTopicId=", topicId, "&sortBy=-created") })
                    .then(function(response) {
                        $scope.status = response.status;
                        $scope.lReviews = response.data;
                    }, function(response) {
                        $scope.lReviews = response.data || "Request failed";
                        $scope.status = response.status;
                    });
        };
        $scope.getLatestReviews();
        
        //        Top Liked Reviews
        $scope.getTopLikedReviews = function(topicId){
            var topicId = localStorage.getItem('topicId');
        $http({method: 'GET',
                url: getReviews.concat("?ownerTopicId=", topicId, "&sortBy=-upvotes") })
                    .then(function(response) {
                        $scope.status = response.status;
                        $scope.tlReviews = response.data;
                    }, function(response) {
                        $scope.tlReviews = response.data || "Request failed";
                        $scope.status = response.status;
                    });
        };
        $scope.getTopLikedReviews();
    }
]);

