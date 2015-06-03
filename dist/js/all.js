//  Add ui-router as a dependency
angular.module('app', ['ui.router',"ngResource"]);
angular.module('app').config(function($stateProvider, $urlRouterProvider){

    //  If a user goes to an url that doesn't have a valid state assigned
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('domov',
	{
		url: '/',
		template: '<home></home>'
	});

	$stateProvider.state("category",{
		url: "/category/:categoryId/products",
		template : "<category></category>",
		controller: "CategoryController"
	});

	$stateProvider.state("product",{
		url: "/products/:productId",
		template: "<product></product>",
		controller: "ProductController"

	});

	$stateProvider.state("shoppingCart",{
		url:"/shoppingCart",
		template: "<shopping-cart title=\"Košarica\" show-buttons=\"true\"></shopping-cart>",
		controller: "ShoppingCartController"
	});

	$stateProvider.state("purchaseForm",{
		url:"/purchaseForm",
		template: "<purchase-form></purchase-form>", 
		controller: "PurchaseFormController"
	});

	$stateProvider.state('orders',{
        url:         '/orders',
        template: '<div  ng-show=\"orderSubmitted\"><h2>Naročilo potrjeno!</h2><p class="text-success">Hvala za nakup</p></div><div ng-hide=\"orderSubmitted\"><h2>Nekaj je šlo narobe!!!</h2><p class="text-danger">Podatki niso bili vnešeni pravilno.</p></div>',
        controller:  function ($scope, OrderFactory, ShoppingCartFactory)
        {
        	if(Object.getOwnPropertyNames(ShoppingCartFactory.getUserData()).length !== 0){
	            var newOrder = new OrderFactory(ShoppingCartFactory.getUserData());
	            newOrder.$save();
	            $scope.orderSubmitted = true;
	        }
	        else{
	        	$scope.orderSubmitted = false;
	        }
        }
    });

    $stateProvider.state("aboutUs",{
		url:"/aboutUs",
		template: "<about-us></about-us>", 
		controller: "AboutUsController"
	});

    $stateProvider.state("privacyPolicy",{
		url:"/privacyPolicy",
		template: "<privacy-policy></privacy-policy>", 
		controller: "PrivacyPolicyController"
	});

	$stateProvider.state("cookies",{
		url:"/cookies",
		template: "<cookies></cookies>", 
		controller: "CookiesController"
	});


});


angular.module('app').controller('AboutUsController', function($scope){
	$scope.title = "O nas"

});
angular.module('app').directive('aboutUs', function(){
	return {
		restrict: 'E',
		scope:{},
		controller: 'AboutUsController',
		templateUrl: 'templates/aboutus-template.html'
	};
});
angular.module('app').controller('CategoryController', function($scope,$http,$stateParams,CategoryFactory){
	

	$scope.status = 'V teku';


	$scope.category = CategoryFactory.getCategoryProductsFromREST().query({id:$stateParams.categoryId, onlyStocked:true});


    $scope.categories = CategoryFactory.getCategoriesFromREST().query({}, function(success){
    	$scope.categoryName = CategoryFactory.getCategoryName($stateParams.categoryId, $scope.categories);
    });

    


	

});
angular.module('app').directive('category', function(){
	return {
		restrict: 'E',
		scope:{},
		controller: 'CategoryController',
		templateUrl: 'templates/category-template.html'
	};
});
angular.module('app').factory('CategoryFactory', function ($resource) {

    return {
    	
    	getCategoriesFromREST:function(){
    		return $resource('http://smartninja.betoo.si/api/eshop/categories');
    	},
    	getCategoryProductsFromREST:function(){
    		return $resource("http://smartninja.betoo.si/api/eshop/categories/:id/products");
    	},
    	getCategoryName:function(id, categories){
			for(var i=0;i<categories.length;i++){
				if(categories[i].id == id){

					return categories[i].category;
				}
			}
		}	


    }
    
});
angular.module('app').controller('ExampleController', function($scope){

	$scope.example = 'Example from ExampleController';

});
angular.module('app').directive('appExample', function(){
	return {
		restrict: 'E',
		scope:{},
		controller: 'ExampleController',
		templateUrl: 'templates/example-template.html'
	};
});
angular.module('app').controller('CookiesController', function($scope){
	$scope.title = "Piškotki";

});
angular.module('app').directive('cookies', function(){
	return {
		restrict: 'E',
		scope:{},
		controller: 'CookiesController',
		templateUrl: 'templates/cookies-template.html'
	};
});
angular.module('app').controller('HomeController', function($scope,$http,CategoryFactory){

	$scope.title = 'Domov';

	$scope.status = 'V teku';

	//    Get request
  	$scope.categories = CategoryFactory.getCategoriesFromREST().query({});

});
angular.module('app').directive('home', function(){
	return {
		restrict: 'E',
		scope:{},
		controller: 'HomeController',
		templateUrl: 'templates/home-template.html'
	};
});
angular.module("app").factory("OrderFactory",function($resource){
	return $resource('http://smartninja.betoo.si/api/eshop/orders');
});
angular.module('app').controller('PrivacyPolicyController', function($scope){
	$scope.title = "Politika zasebnosti";

});
angular.module('app').directive('privacyPolicy', function(){
	return {
		restrict: 'E',
		scope:{},
		controller: 'PrivacyPolicyController',
		templateUrl: 'templates/privacypolicy-template.html'
	};
});
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

});
angular.module('app').directive('purchaseForm', function(){
	return {
		restrict: 'E',
		scope:{},
		controller: 'PurchaseFormController',
		templateUrl: 'templates/purchaseform-template.html'
	};
});
angular.module('app').controller('ProductController', function($scope,$http,$stateParams, ShoppingCartFactory, ProductFactory){


	$scope.status = 'V teku';

	$scope.model = ShoppingCartFactory;

	$scope.addProduct = function(product){
    	$scope.model.addProduct(product);
 	};

	$scope.product = ProductFactory.getProductFromREST().get({id:$stateParams.productId});

});
angular.module('app').directive('product', function(){
	return {
		restrict: 'E',
		scope:{},
		controller: 'ProductController',
		templateUrl: 'templates/product-template.html'
	};
});
angular.module('app').factory('ProductFactory', function ($resource) {

    return {
    	
    	getProductFromREST:function(){
    		return $resource("http://smartninja.betoo.si/api/eshop/products/:id");
    	}


    }
    
});
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
angular.module('app').directive('shoppingCart', function(){
	return {
		restrict: 'E',
		scope:{
			showButtons : "@",
			title : "@"
		},
		controller: 'ShoppingCartController',
		templateUrl: 'templates/shoppingcart-template.html'
	};
});
angular.module("app").factory("ShoppingCartFactory",function($state){
	var products = [];
	var userData = {};
	function contains(array, obj) {
	    for (var i = 0; i < array.length; i++) {
	        if (array[i] === obj) {
	            return true;
	        }
	    }
	    return false;
	}
	return {

		emptyShoppingCart : {
			msg: "Košarica je prazna! Dodajte izdelke iz trgovine.",
    		show: true
  		},
  		redirect : function(){
  			$state.go("purchaseForm");
  		},
		addProduct: function(product){
			if(contains(products, product)){
				product.quantity +=1;
			}else{
				product.quantity = 1;
				products.push(product);
			}

			if (this.getNumberOfProducts() === 0) {
		      this.emptyShoppingCart.show = true;
		    }else{
		      this.emptyShoppingCart.show = false;
		    }
			
		},
		removeProduct: function(product){
			products.splice(product,1);
			if (this.getNumberOfProducts() === 0) {
		      this.emptyShoppingCart.show = true;
		    }else{
		      this.emptyShoppingCart.show = false;
		    }
		},
		getProducts: function(){
			return products;
		},
		getNumberOfProducts: function(){
			var count = 0;
			for(var i = 0; i< products.length; i++){
				count += products[i].quantity;
			}
			return count;
		},
		getPriceOfAllProducts: function(){
			var count = 0;
			for(var i = 0;i<products.length;i++){
				count += products[i].quantity * products[i].price;
			}
			return count;
		},
		setUserData : function(object){
			userData = object;
		},
		getUserData : function(){
			return userData;
		}
	};
});