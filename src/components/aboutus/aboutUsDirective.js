angular.module('app').directive('aboutUs', function(){
	return {
		restrict: 'E',
		scope:{},
		controller: 'AboutUsController',
		templateUrl: 'templates/aboutus-template.html'
	};
});