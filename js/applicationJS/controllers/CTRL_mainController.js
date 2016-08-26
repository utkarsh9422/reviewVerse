app.controller("mainController", ['$scope', '$rootScope', '$location','$translate','$timeout',
function($scope, $rootScope, location,$translate,$timeout) {
	$scope.heading = $rootScope.heading;
	
	$rootScope.$watch('heading', function(newVal, OldVal) {
		$scope.heading = newVal;
	});
    $rootScope.AILoading = "true";
    $timeout(function() {
		$rootScope.AILoading = false;
	}, 2500);
	
	$rootScope.doTheBack = function() {
		window.history.back();
	};
}]); 