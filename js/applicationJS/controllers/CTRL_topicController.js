app.controller("topicController", [
    '$scope', '$http', 'authentication', '$auth', '$location', 
    function($scope, $http, authentication, $auth, $location ) {
        
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
    }
]);

