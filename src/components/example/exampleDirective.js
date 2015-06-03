angular.module('app').directive('appExample', function(){
	return {
		restrict: 'E',
		scope:{},
		controller: 'ExampleController',
		templateUrl: 'templates/example-template.html'
	};
});