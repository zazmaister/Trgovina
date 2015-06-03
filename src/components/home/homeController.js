angular.module('app').controller('HomeController', function($scope,$http,CategoryFactory){

	$scope.title = 'Domov';

	$scope.status = 'V teku';

	//    Get request
  	$scope.categories = CategoryFactory.getCategoriesFromREST().query({});

});