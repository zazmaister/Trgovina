angular.module('app').directive('home', function(){
	return {
		restrict: 'E',
		scope:{},
		controller: 'HomeController',
		templateUrl: 'templates/home-template.html'
	};
});