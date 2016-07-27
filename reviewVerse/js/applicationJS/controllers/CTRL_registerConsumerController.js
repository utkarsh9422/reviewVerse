app.controller("registerController", ['$scope', '$rootScope', '$location', '$http', 'webservice', '$filter', 'saveFormDataService',
function($scope, $rootScope, $location, $http, webservice, $filter, saveFormDataService) {
	$rootScope.heading = "Register";

	var formData = saveFormDataService.getRegisterFormData();
	var mapSelected = "";
	$scope.counter = 1;

	$http.get('resources/addresses.json').success(function(data) {
		$scope.cities = data.Cities;
	});

	if (formData != null) {
		$scope.firstname = formData.firstname;
		$scope.lastname = formData.lastname;
		$scope.mobile = formData.mobile;
		$scope.email = formData.email;
		$scope.nationalID = formData.nationalID;

		$scope.selectedCity1 = formData.deliveryAddress1.city;

		$scope.selectedArea1 = formData.deliveryAddress1.area;
		$scope.street1 = formData.deliveryAddress1.street;
		$scope.pincode1 = formData.deliveryAddress1.pobox;
		$scope.address1 = formData.deliveryAddress1.address;

		$scope.selectedCity1 = formData.deliveryAddress2.city;

		$scope.selectedArea2 = formData.deliveryAddress2.area;
		$scope.street2 = formData.deliveryAddress2.street;
		$scope.pincode2 = formData.deliveryAddress2.pobox;
		$scope.address2 = formData.deliveryAddress2.address;

		$scope.selectedCity1 = formData.deliveryAddress1.city;

		$scope.selectedArea3 = formData.deliveryAddress3.area;
		$scope.street3 = formData.deliveryAddress3.street;
		$scope.pincode3 = formData.deliveryAddress3.pobox;
		$scope.address3 = formData.deliveryAddress3.address;

		$scope.defaultadress = formData.defaultadress;
		$scope.counter = formData.counter;
	}

	$scope.incrementCounter = function() {
		$scope.counter++;
		//alert($scope.counter);
	};

	$scope.openMap1 = function() {
		mapSelected = 1;
		saveForm();
		$location.path('/viewMapRegister');
	};

	$scope.openMap2 = function() {
		mapSelected = 2;
		saveForm();
		$location.path('/viewMapRegister');
	};

	$scope.openMap3 = function() {
		mapSelected = 3;
		saveForm();
		$location.path('/viewMapRegister');
	};

	function saveForm() {
		formData = {};
		formData.firstname = $scope.firstname;
		formData.lastname = $scope.lastname;
		formData.mobile = $scope.mobile;
		formData.email = $scope.email;
		formData.nationalID = $scope.nationalID;

		formData.deliveryAddress1 = {};
		if ($scope.selectedCity1 != null) {
			formData.deliveryAddress1.city = $scope.selectedCity1.name;
		}
		formData.deliveryAddress1.area = $scope.selectedArea1;
		formData.deliveryAddress1.street = $scope.street1;
		formData.deliveryAddress1.pobox = $scope.pincode1;
		formData.deliveryAddress1.address = $scope.address1;

		formData.deliveryAddress2 = {};
		if ($scope.selectedCity2 != null) {
			formData.deliveryAddress2.city = $scope.selectedCity2;
		}
		formData.deliveryAddress2.area = $scope.selectedArea2;
		formData.deliveryAddress2.street = $scope.street2;
		formData.deliveryAddress2.pobox = $scope.pincode2;
		formData.deliveryAddress2.address = $scope.address2;

		formData.deliveryAddress3 = {};
		if ($scope.selectedCity3 != null) {
			formData.deliveryAddress3.city = $scope.selectedCity3;
		}
		formData.deliveryAddress3.area = $scope.selectedArea3;
		formData.deliveryAddress3.street = $scope.street3;
		formData.deliveryAddress3.pobox = $scope.pincode3;
		formData.deliveryAddress3.address = $scope.address3;

		formData.defaultadress = $scope.defaultadress;
		formData.counter = $scope.counter;

		formData.deliveryMapState = mapSelected;

		saveFormDataService.setRegisterFormData(formData);
	}

	//to check user has input the required fields
	var checkValidation = function() {
		var valid = "false";
		//to check user has not left username empty
		if ($scope.firstname != undefined) {
			//to check user has not left mobile no empty
			if ($scope.mobile != undefined) {
				//to check user has not left email empty
				if ($scope.email != undefined) {
					//to check user has selected default address
					if ($scope.defaultadress != undefined) {

						if ($scope.defaultadress == "DELIVERY_ADDRESS_1") {
							//to check user has entered all fiels of selected default address
							alert($scope.selectedCity1);
							if ($scope.selectedCity1 == null || $scope.selectedArea1 == null || $scope.street1 == null || $scope.address1 == null || $scope.pincode1 == null) {
								alert("Please fill all the fields of Address1 ");

							} else {
								valid = "true";
							}
						} else if ($scope.defaultadress == "DELIVERY_ADDRESS_2") {
							//to check user has entered all fiels of selected default address
							if ($scope.selectedCity2 == null || $scope.selectedArea2 == null || $scope.street2 == null || $scope.address2 == null || $scope.pincode2 == null) {
								alert("Please fill all the fields of Address2");

							} else {
								valid = "true";
							}
						} else if ($scope.defaultadress == "DELIVERY_ADDRESS_3") {
							//to check user has entered all fiels of selected default address
							if ($scope.selectedCity3 == null || $scope.selectedArea3 == null || $scope.street3 == null || $scope.address3 == null || $scope.pincode3 == null) {
								alert("Please fill all the fields of Address3");

							} else {
								valid = "true";
							}
						}
					} else// to alert the user to select atleast one default address
					{
						alert("Please select default address");
					}
				} else {// to alert the user to fill valid emailID
					alert("Please enter valid emailID");
				}

			} else {// to alert the user to fill mobile number
				alert("Please enter mobile number");
			}

		} else {
			alert("Please enter username");
		}
		return valid;
	};

	//function to register user and authenticate
	$scope.registerUser = function() {
		//user registration service will be hit only after form validation are successful
		if (checkValidation() == "true") {

			var success = function(response) {
				if (response.status == 200) {//if response isn't valid or null'
					/*$scope.status = response.data['MESSAGE']['PAYLOAD']['REGISTRATION']['TABLE']['STATUS'];*/
					alert("Service was hit");

					$location.path('/login');
					//Navigate to Dashboard
				};
			};
			var error = function(response) {
				alert('error');
			};

			//input parameters of webservice
			var inputParam = {
				"MESSAGE" : {
					"HEADER" : {
						"LOGIN" : "gr00107978@TechMahindra"
					},
					"PAYLOAD" : {
						"REGISTRATION" : {
							"FIRST_NAME" : $scope.firstname,
							"LAST_NAME" : $scope.lastname,
							"USER_PASSWORD" : "sdFrq3fdsf345235dgafg",
							"IDENTITY_TYPE" : "DL",
							"IDENTITY_NUMBER" : $scope.nationalID,
							"MOBILE_NUMBER" : $scope.mobile,
							"EMAIL" : $scope.email,
							"Default_Address" : $scope.defaultadress,

							"DELIVERY_ADDRESS_1" : $scope.areas1 + $scope.area1 + $scope.street1 + $scope.address1 + $scope.pincode1,

							"DELIVERY_ADDRESS_2" : $scope.areas2 + $scope.area2 + $scope.street2 + $scope.address2 + $scope.pincode2,
							"DELIVERY_ADDRESS_3" : $scope.areas3 + $scope.area3 + $scope.street3 + $scope.address3 + $scope.pincode3,
							"CONSUMER_TYPE" : "prefilled"
						}
					},
					"SESSION" : {
						"LATITUDE" : "0.0",
						"LONGITUDE" : "0.0",
						"APP" : "GascoTest",
						"ORG" : "TechMahindra",
						"TRANSACTION" : "REGISTRATION",
						"KEY" : "REGISTRATION/ID",
						"TYPE" : "REGISTRATION",
						"CHANNEL" : "b2c"
					}
				}
			};

			webservice.callPostMethod(register_user, inputParam, success, error);
		}
	};

}]);
