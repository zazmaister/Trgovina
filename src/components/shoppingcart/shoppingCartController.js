angular.module('app').controller('ShoppingCartController', function($scope,$http,ShoppingCartFactory, $modal){


  $scope.shoppingCartTemplateURL = {
    templateUrl: "templates/shoppingcart-template.html",
    title:"Košarica"
  };

  $scope.model = ShoppingCartFactory;

  $scope.emptyShoppingCart = $scope.model.emptyShoppingCart;

  $scope.getPriceOfAllProducts = function(){
      return $scope.model.getPriceOfAllProducts();
  };
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

   $scope.openModal = function ()
            {
                var modalInstance = $modal.open({
                                                    templateUrl: 'templates/modalShoppingCart-template.html',
                                                    controller:  'ModalInstanceController',
                                                    resolve:     {
                                                        input: function ()
                                                        {
                                                            return {priceOfAllProducts:$scope.getPriceOfAllProducts(),
                                                                    numberOfProducts:$scope.getNumberOfProducts()};
                                                        }
                                                    }
                                                });

                modalInstance.result.then(function (success)
                                          {
                                              $scope.redirectToPurchaseForm();
                                          }, function (error)
                                          {
                                              
                                          });
            }

});