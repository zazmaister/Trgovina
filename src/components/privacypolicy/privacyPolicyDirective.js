angular.module('app').directive('privacyPolicy', function(){
	return {
		restrict: 'E',
		scope:{},
		controller: 'PrivacyPolicyController',
		templateUrl: 'templates/privacypolicy-template.html'
	};
});