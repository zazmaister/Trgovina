angular.module('app').controller('ShoppingCartController', function($scope,$http,ShoppingCartFactory){


  

  $scope.model = ShoppingCartFactory;

  $scope.emptyShoppingCart = $scope.model.emptyShoppingCart;

  $scope.addProduct = function(product){
    $scope.model.addProduct(product);
  };
  $scope.removeProduct = function(product){
    $scope.model.removeProduct(product);
  };
  $scope.getProducts = function(){
    return $scope.model.getProducts();
  };
  $scope.getNumberOfProducts = function(){
    return $scope.model.getNumberOfProducts();
  };
  $scope.redirectToPurchaseForm = function(){
    return $scope.model.redirect();
  };

});