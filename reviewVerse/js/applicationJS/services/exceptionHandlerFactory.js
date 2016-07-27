/**Dated- 14thMarch
 @author pa00127946
 log all the exceptions **/

app.factory('$exceptionHandler', function() {
	return function(exception, cause) {
		exception.message += ' (caused by "' + cause + '")';
		throw exception;
	};
}); 