app.controller("loginController", ['$scope', '$rootScope', '$location', '$http', 'authentication', '$modal', '$localStorage', '$auth',
    function($scope, $rootScope, $location, $http, authentication, $modal, $localStorage, $auth) {
        //  *********Satellizer*************8
        $scope.authenticate = function(provider) {
            $auth.authenticate(provider)
                    .then(function() {
//                        toastr.success('You have successfully signed in with ' + provider + '!');
                        $location.path('/restaurant');
                    })
                    .catch(function(error) {
                        if (error.message) {
                            // Satellizer promise reject error.
                            alert(error.message);
                        } else if (error.data) {
                            // HTTP response error from server
                            alert(error.data.message, error.status);
                        } else {
                            alert(error);
                        }
                    });
        };

        //      *************Register****************    

//        $scope.signUp = function() {
//            if ($scope.credentials.name == "" || $scope.credentials.email == "" || $scope.credentials.password == "") {
//                alert("Please fill in the required information.");
//            }
//            var credentials = {
//                name: $scope.credentials.name,
//                email: $scope.credentials.email,
//                password: $scope.credentials.password
//            };
//            authentication.register(credentials)
//                    .error(function(err) {
//                        alert(err);
//                    })
//                    .then(function() {
//                        alert("User Resgitered");
//                        $location.path('/login');
//                    });
//        };

        $scope.signUp = function() {
            $auth.signup($scope.user)
                    .then(function(response) {
                        $auth.setToken(response);
                        $location.path('/restaurant');
                        alert('You have successfully created a new account and have been signed-in');
                    })
                    .catch(function(response) {
                        alert(response.data.message);
                    });
        };

        $scope.login = function() {
            $auth.login($scope.user)
                    .then(function() {
                        alert('You have successfully signed in!');
                        $location.path('/restaurant');
                    })
                    .catch(function(error) {
                        alert(error.data.message, error.status);
                    });
        };

//        $scope.login = function() {
//            var credentials = {
//                email: $scope.login.email,
//                password: $scope.login.password
//            };
//            authentication.login(credentials)
//                    .error(function(err) {
//                        alert(err);
//                    })
//                    .then(function() {
//                        $location.path('/restaurant');
//                        alert("Logged In");
//                    });
//        };

        $scope.register = function() {
            var modalInstance = $modal.open({
                templateUrl: 'views/PRTL_register.html',
                controller: 'loginController'
            });
        }
        $scope.userLogin = function() {
            $location.path('/restaurant');
//		loginRequest();
        }

        $scope.forgetPassword = function() {
            var modalInstance = $modal.open({
                templateUrl: 'views/PRTL_forgetPassword.html',
                controller: 'forgetPasswordController'
            });
        }

        $scope.forgetConsumerID = function() {
            var modalInstance = $modal.open({
                templateUrl: 'views/PRTL_forgetConsumerID.html',
                controller: 'forgetConsumerIDController'
            });
        }
        /*
         * Login Request to the server
         */
        function loginRequest() {
            $location.path('/restaurant');
//		$rootScope.AILoading = true;
//		var successCallback = function(response) {
//			$rootScope.AILoading = false;
//			if (response != undefined) {// if empty or undefined response
//				var responseObj = response.data.MESSAGE.PAYLOAD.LOGIN.TABLE;
//				if (responseObj.UMPERRORMSG == undefined) {//if user is authenticated'
//					$scope.consumerProfile = responseObj;
//					sharedService.setConsumerProfile($scope.consumerProfile);
//						sharedService.setIsLoggedIn(true);
//						$location.path('/dashboard');	//navigate to consumer dashboard
//					
//
//				} else {
//					
//					alert(globalErrorMsg.entervalidCredentials);
//				}
//			}
//			else{
//				
//				alert("The Server did not respond properly");
//			}
//		}
//		
//		var errorCallback = function() {
//		alert("Could not connect with the Server");
//
//			$rootScope.AILoading = false;
//		}
//
//		var inputParam = {
//			"MESSAGE" : {
//				"HEADER" : {
//					"LOGIN" : "gr00107978@TechMGasco"
//				},
//				"PAYLOAD" : {
//					"LOGIN" : {
//						"CUSTOMER_ID" : $scope.username,
//						"CUST_PASSWORD" : $scope.password,
//						"CONSUMER_TYPE" : "consumer"
//					}
//				},
//				"SESSION" : {
//					"LATITUDE" : "0.0",
//					"LONGITUDE" : "0.0",
//					"APP" : "",
//					"ORG" : "TechMGasco",
//					"TRANSACTION" : "LOGIN",
//					"KEY" : "LOGIN/ID",
//					"TYPE" : "LOGIN",
//					"CHANNEL" : "b2c"
//				}
//			}
//		};
//		
//		//posting the Login data for authentication
//		webservice.callPostMethod(verify_user, inputParam, successCallback, errorCallback);
        }
        $scope.parallax = function() {
            $(document).ready(function() {           //Parallax
                $('.button-collapse').sideNav();
                $('.parallax').parallax();
            });
        };
        $scope.parallax();
        $scope.slider = function() {
            $(document).ready(function() {           //Team carousel
                $(' .carousel').carousel();
            });
        };
        $scope.slider();
        $scope.easySlide = function() {
            jQuery('a[href^="#"]').click(function(e) {
                jQuery('html,body').animate({scrollTop: jQuery(this.hash).offset().top}, 1000);
                return false;
                e.preventDefault();
            });
        };
        $scope.easySlide();
    }]);






