angular.module('app').directive('category', function(){
	return {
		restrict: 'E',
		scope:{},
		controller: 'CategoryController',
		templateUrl: 'templates/category-template.html'
	};
});