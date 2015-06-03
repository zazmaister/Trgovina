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

