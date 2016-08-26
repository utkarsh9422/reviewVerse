app.controller("loginController", ['$scope', '$rootScope', '$location', '$http', 'webservice', 'sharedService', '$modal',
function($scope, $rootScope, $location, $http, webservice, sharedService, $modal) {
    $scope.username;
	$scope.password;
	$scope.consumerProfile = {};
	//object saving the user profile
	$rootScope.AILoading = false;
	//loading indicator to be false as the page loads.
	/*
	 * to add active class for the current language selection
	 */
	$('.language button').click(function() {
		$(this).closest('.language').find('.active').removeClass('active');
		$(this).parent().addClass('active');
	});
	//on selection of consumer or distributor ,show corresponding login page.
	

	$scope.userLogin = function() {
            $location.path('/restaurant');
//		loginRequest();
	}

	$scope.forgetPassword = function() {
		var modalInstance = $modal.open({
			templateUrl : 'views/PRTL_forgetPassword.html',
			controller : 'forgetPasswordController'
		});

	}

	$scope.forgetConsumerID = function() {
		var modalInstance = $modal.open({
			templateUrl : 'views/PRTL_forgetConsumerID.html',
			controller : 'forgetConsumerIDController'
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
$scope.parallax = function () {
 $(document).ready(function(){           //Parallax
     $('.button-collapse').sideNav();
    $('.parallax').parallax();
    });
          
          };
$scope.parallax();
$scope.slider = function () {
              $(document).ready(function(){           //Team carousel
      $(' .carousel').carousel();
    });
          };
$scope.slider();
$scope.easySlide=function(){
                jQuery('a[href^="#"]').click(function(e) {
                    jQuery('html,body').animate({scrollTop: jQuery(this.hash).offset().top}, 1000);
                    return false;
                    e.preventDefault();
                });
};
$scope.easySlide();
}]);






