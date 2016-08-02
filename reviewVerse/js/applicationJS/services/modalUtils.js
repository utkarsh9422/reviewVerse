app.factory('modalUtils', ['$modalStack',
function($modalStack) {
	return {
		modalsExist : function() {
			return !!$modalStack.getTop();
		},
		closeAllModals : function() {
			$modalStack.dismissAll();
		}
	};
}]); 