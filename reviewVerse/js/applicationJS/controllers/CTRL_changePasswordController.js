app.controller("changePasswordController", ['$scope','$location','$rootScope','webservice',
function($scope,$location,$rootScope,webservice) {
	
	var head = "{\"MESSAGE\" : {\"HEADER\" : {\"LOGIN\" : \"gr00107978@TechMahindra\"},\"PAYLOAD\"";
	var session = "\"SESSION\": {\"LATITUDE\": \"0.0\",\"LONGITUDE\": \"0.0\",\"APP\": \"GascoTest\", \"ORG\": \"TechMahindra\",\"TRANSACTION\": \"UPDATE_PASSW\",\"KEY\": \"UPDATE_PASSW/ID\",\"TYPE\": \"CHANGEPASSWORD\",\"CHANNEL\": \"b2c\"}}}";
	$rootScope.AILoading = false;
	$rootScope.heading = "CHANGE_PASSWORD";
	
	$scope.submitChangedPassword = function() {
		if( $scope.newPassword != $scope.confirmPassword ){
			alert("New Password and Confirm Password does not match.");
		}
		else
		{
			sendRequest();
		}				
	};
	
	function sendRequest(){
		$rootScope.AILoading = true;
		var successCallBack = function(response) {
			$rootScope.AILoading = false;
			if (response != undefined) {// if empty or undefined response
				//$scope.userError = response.data['MESSAGE']['PAYLOAD']['FORGOTCONSUMERID']['TABLE']['UMPERRORMSG'];
				
				if (response.status == 200) {
					alert("Password is reset. New password will be sent through sms.");
					

				} else {
					//$location.path('/dashboard');// for developement phase to redirect directly
					alert(globalErrorMsg.entervalidCredentials);
					
				}
			}
			else{
				alert(globalErrorMsg.entervalidCredentials);
				
			}
		}
		var errorCallback = function() {
			alert("Error in connecting to the webservice");
		}
		var inputParamString = head + ": {\"UPDATE_PASSW\" : {\"CONSUMER_ID\" : \" 4408 \",\"USER_PASSWORD\" : \"654321355\"}},"+session;
		var inputParamJson = JSON.parse(inputParamString);

		//posting the Login data for authentication
		webservice.callPostMethod(verify_user, inputParamJson, successCallBack, errorCallback);
	}
}]); 