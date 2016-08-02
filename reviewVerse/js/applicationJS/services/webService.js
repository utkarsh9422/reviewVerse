
app.factory('webservice', ['$http', '$q', '$rootScope', '$location', '$timeout',
function($http, $q, $rootScope, $location, $timeout) {
	
	
	return {
		callPostMethod : function(url, inputParam, successCallback,errorCallback) {

			var config = 
			{
                method : 'POST',
                url : url,
                data : inputParam,
                headers : {
                	'Content-Type' : 'application/json'
                }
            }
			
			$http(config).then(function(response) {
				successCallback(response);
				$rootScope.AILoading = false;
			}, function(response) {
				networkErrors(response.status);
				errorCallback(response);
				$rootScope.AILoading = false;
			});
		}
	}
	
	
}]);

function networkErrors(errorCode){
	switch (errorCode) {
		case 0: {
			alert("Internet connection not available.Please check your internet connection");
			break;
		}/*Wifi is not connected*/
		case 404: {
			alert("Internet connection not available.Please check your internet connection");
			break;
		}/*Wifi is not connected*/
		case 500: {
			alert("Server Error");
			break;
		}/*Server Error*/
		default: {
			alert("Something went wrong..");
			
		}/*Network Error*/			

	}
}
