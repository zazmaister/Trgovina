angular.module("app").factory("ShoppingCartFactory",function($state, locker){
	var products = [];
	var userData = {};
	//Returns index of product in products array if there is any.
	function contains(array, obj) {


	    for (var i = 0; i < array.length; i++) {
	        if (array[i]["id"] === obj["id"]) {
	            return i;
	        }
	    }
	    return -1;
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
			var index = contains(products, product);
			if(index !== -1){
				products[index].quantity +=1;
			}else{
				products.push(product);
				products[products.length-1].quantity = 1;
			}
			locker.put('products', products);
			if (this.getNumberOfProducts() === 0) {
		      this.emptyShoppingCart.show = true;
		    }else{
		      this.emptyShoppingCart.show = false;
		    }

		    locker.put("showEmptyShoppingCart", this.emptyShoppingCart.show);

		    
			
		},
		removeProduct: function(product){
			products.splice(product,1);
			locker.put('products', products);
			if (this.getNumberOfProducts() === 0) {
		      this.emptyShoppingCart.show = true;
		    }else{
		      this.emptyShoppingCart.show = false;
		    }
		    locker.put("showEmptyShoppingCart", this.emptyShoppingCart.show);
		},
		getProducts: function(){
			return products;
		},
		setProducts: function(productsFromLocker){
			products = productsFromLocker;
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
		},
		getFromLocker : function(){
			return locker.get("products",[]);
		},
		emptyLocker: function(){
			locker.forget("products");
			locker.forget("showEmptyShoppingCart");

    		locker.empty();

    		products = this.getFromLocker();
    		if (this.getNumberOfProducts() === 0) {
		      this.emptyShoppingCart.show = true;
		    }else{
		      this.emptyShoppingCart.show = false;
		    }
		    
		}
	};
});