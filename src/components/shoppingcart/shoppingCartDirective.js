angular.module('app').directive('shoppingCart', function(){
	return {
		restrict: 'E',
		scope:{
			showButtons : "@",
			title : "@"
		},
		controller: 'ShoppingCartController',
		templateUrl: 'templates/shoppingcart-template.html'
	};
});