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