app.controller('forgetPasswordController', ['$scope', '$location', '$modalInstance', 'webservice', '$rootScope', '$modal',
function($scope, $location, $modalInstance, webservice, $rootScope, $modal) {

	$rootScope.AILoading = false;
	$scope.consumerId = "";
	$scope.mobileNo = "";
	$scope.submitForgetPassword = function() {

		if ($scope.consumerId.length == 0) {
			alert("Enter Consumer ID");
		} else if ($scope.mobileNo.length == 0) {
			alert("Enter Mobile No");
		} else {
			sendRequest();
		}
	};

	function sendRequest() {
		$rootScope.AILoading = true;
		var successCallback = function(response) {
			if (response != undefined) {// if empty or undefined response
				
				var responseObj = response.data['MESSAGE']['PAYLOAD']['FORGET_PASSW']['TABLE'];
				if (responseObj.UMPERRORMSG == undefined) {
					alert("Credentials verified. New password will be sent through sms.");
					$modalInstance.close();
					$rootScope.AILoading = false;

				} else {
					alert(globalErrorMsg.entervalidCredentials);
					//$modalInstance.close();
					$rootScope.AILoading = false;
				}
			} else {
				alert("The Server did not respond properly");
				//$modalInstance.close();
				$rootScope.AILoading = false;
			}
		}

		
		var errorCallback = function(response) {
			alert("Could not connect with the Server");
			//$modalInstance.close();
			$rootScope.AILoading = false;
		}
		
		var inputParam = {
			  "MESSAGE": {
			    "HEADER": { 
			    	"LOGIN": "gr00107978@TechMGasco" 
			    },
			    "PAYLOAD": {
			      "FORGET_PASSW": {
			        "CONSUMER_ID": $scope.consumerId,
			        "MOBILE_NUMBER": $scope.mobileNo
			      }
			    },
			    "SESSION": {
			      "LATITUDE": "0.0",
			      "LONGITUDE": "0.0",
			      "APP": "",
			      "ORG": "TechMGasco",
			      "TRANSACTION": "FORGET_PASSW",
			      "KEY": "FORGET_PASSW/ID",
			      "TYPE": "FORGET_PASSW",
			      "CHANNEL": "b2c"
			    }
			  }
			};

		webservice.callPostMethod(verify_user, inputParam, successCallback,errorCallback);
	}

	$scope.closeModal = function() {
		$modalInstance.close();
	}
}]);
