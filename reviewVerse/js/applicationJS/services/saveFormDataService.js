/*
	Service to save the data for any screen having forms
*/
app.factory('saveFormDataService',function(){
	//Refill Order Screen Data
	var refillOrderData = null;
	
	var setRefillOrderData = function (data)
	{
		refillOrderData = data;
	};
	
	var getRefillOrderData = function ()
	{
		return refillOrderData;
	};
	
	var clearRefillOrderData = function()
	{
		refillOrderData = null;
	};
	
	//Register Consumer Screen Data
	var registerFormData = null;
	
	var setRegisterFormData = function (data)
	{
		registerFormData = data;
	};
	
	var getRegisterFormData = function ()
	{
		return registerFormData;
	};
	
	var clearRegisterFormData = function()
	{
		registerFormData = null;
	};
	
	
	//Edit Consumer Profile Screen Data
	var editProfileFormData = null;
	
	var setEditProfileFormData = function (data)
	{
		editProfileFormData = data;
	};
	
	var getEditProfileFormData = function ()
	{
		return editProfileFormData;
	};
	
	var clearEditProfileFormData = function()
	{
		editProfileFormData = null;
	};
	return{
		setRefillOrderData: setRefillOrderData,
		getRefillOrderData: getRefillOrderData,
		clearRefillOrderData: clearRefillOrderData,
		
		setRegisterFormData: setRegisterFormData,
		getRegisterFormData: getRegisterFormData,
		clearRegisterFormData: clearRegisterFormData,
		
		setEditProfileFormData: setEditProfileFormData,
		getEditProfileFormData: getEditProfileFormData,
		clearEditProfileFormData: clearEditProfileFormData
	};
});