angular.module('app').factory('ProductFactory', function ($resource) {

    return {
    	
    	getProductFromREST:function(){
    		return $resource("http://smartninja.betoo.si/api/eshop/products/:id");
    	}


    }
    
});