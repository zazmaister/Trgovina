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