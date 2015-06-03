angular.module('app').controller('CategoryController', function($scope,$http,$stateParams,CategoryFactory){
	

	$scope.status = 'V teku';


	$scope.category = CategoryFactory.getCategoryProductsFromREST().query({id:$stateParams.categoryId, onlyStocked:true});


    $scope.categories = CategoryFactory.getCategoriesFromREST().query({}, function(success){
    	$scope.categoryName = CategoryFactory.getCategoryName($stateParams.categoryId, $scope.categories);
    });

    


	

});