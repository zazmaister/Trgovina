angular.module('app').directive('purchaseForm', function(){
	return {
		restrict: 'E',
		scope:{},
		controller: 'PurchaseFormController',
		templateUrl: 'templates/purchaseform-template.html'
	};
});