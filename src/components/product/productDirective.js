angular.module('app').directive('product', function(){
	return {
		restrict: 'E',
		scope:{},
		controller: 'ProductController',
		templateUrl: 'templates/product-template.html'
	};
});