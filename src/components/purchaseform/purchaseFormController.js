angular.module('app').controller('PurchaseFormController', function($scope,ShoppingCartFactory,$state){

  $scope.model = ShoppingCartFactory;

  $scope.getPriceOfAllProducts = function(){
    return $scope.model.getPriceOfAllProducts();
  };
  $scope.getNumberOfProducts = function(){
    return $scope.model.getNumberOfProducts();
  };
  
  $scope.setUserData = function(){
    var object = {};
    object.firstName = $scope.firstName;
    object.lastName = $scope.lastName;
    object.email = $scope.email;
    object.address = $scope.address;
    object.country = $scope.country;
    object.city = $scope.city;
    object.zip = $scope.zip;
    object.products = [];
    var products = $scope.model.getProducts();
    for(var i = 0; i<products.length; i++ ){
      object.products.push({id:products[i].id,
                            quantity:products[i].quantity});
    }
    $scope.model.setUserData(object);
    $state.go("orders");
  };

  $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

});