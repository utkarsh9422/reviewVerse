app.controller("homeController", [
    '$scope', '$http', 'authentication', '$auth', '$location',
    function($scope, $http, authentication, $auth, $location) {
        //Logout
        $scope.logout = function() {
            console.log("Logout Button Clicked");
            $auth.logout()
                    .then(function() {
                        alert('You have been logged out');
                        $location.path('/login');
                    });
        };
        //Get Profile
        $scope.getProfile = function() {
//            var headers = {'Authorization': authentication.getjwtToken()};

            $http({method: 'GET',
                url: "http://ec2-52-66-112-123.ap-south-1.compute.amazonaws.com/profile/me"}).
                    then(function(response) {
                        if (response.data.google) {
                            $scope.status = response.status;
                            $scope.username = response.data.google.name;
                            $scope.email = response.data.google.email;
                            $scope.img = response.data.google.picture;
                        }
                        else if (response.data.facebook) {
                            $scope.status = response.status;
                            $scope.username = response.data.facebook.name;
                            $scope.email = response.data.facebook.email;
                            $scope.img = response.data.facebook.picture;
                        }
                        else {
                            $scope.status = response.status;
                            $scope.username = response.data.local.name;
                            $scope.email = response.data.local.email;
                        }
                    }, function(response) {
                        $scope.status = response.status;
                        $scope.username = "Cannot Fetch Username";
                        $scope.img = "Cannot Fetch Profile Picture";
                    });

        };
        $scope.getProfile();
        $scope.restaurant= function() {
            $location.path('/restaurant');
//		loginRequest();
        }        
        $scope.menu = function() {
            jQuery(document).ready(function($) {
                $('.button-collapse').sideNav({
                    menuWidth: 300, // Default is 240
                    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
                }
                );
                // Show sideNav
                $('.button-collapse').sideNav('show');
                // Hide sideNav
                $('.button-collapse').sideNav('hide');
            });
        };
        $scope.menu();
    }]);


