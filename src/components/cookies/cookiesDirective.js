angular.module('app').directive('cookies', function(){
	return {
		restrict: 'E',
		scope:{},
		controller: 'CookiesController',
		templateUrl: 'templates/cookies-template.html'
	};
});