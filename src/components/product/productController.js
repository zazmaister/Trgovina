angular.module('app').controller('ProductController', function($scope,$http,$stateParams, ShoppingCartFactory, ProductFactory){


	$scope.status = 'V teku';

	$scope.model = ShoppingCartFactory;

	$scope.addProduct = function(product){
    	$scope.model.addProduct(product);
 	};

	$scope.product = ProductFactory.getProductFromREST().get({id:$stateParams.productId});

});