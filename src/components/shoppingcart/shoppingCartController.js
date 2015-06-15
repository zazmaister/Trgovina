angular.module('app').controller('ShoppingCartController', function($scope,$http,ShoppingCartFactory, $modal, locker){


  $scope.shoppingCartTemplateURL = {
    templateUrl: "templates/popover-template.html",
    title:"Košarica"
  };

  $scope.model = ShoppingCartFactory;

  $scope.emptyShoppingCart = $scope.model.emptyShoppingCart;

  $scope.emptyShoppingCart.show = locker.get("showEmptyShoppingCart", true);
  $scope.model.setProducts($scope.model.getFromLocker());

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

angular.module("app").animation('.slide', [function() {
  return {
    // make note that other events (like addClass/removeClass)
    // have different function input parameters
    enter: function(element, doneFn) {
      jQuery(element).fadeIn(1000, doneFn);

      // remember to call doneFn so that angular
      // knows that the animation has concluded
    },

    move: function(element, doneFn) {
      jQuery(element).fadeIn(1000, doneFn);
    },

    leave: function(element, doneFn) {
      jQuery(element).fadeOut(1000, doneFn);
    }
  }
}]);