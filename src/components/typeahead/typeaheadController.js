angular.module('app').controller('TypeController', function($scope, $http, $location){

    $scope.getItems = function(query){
        return $http.get('http://smartninja.betoo.si/api/eshop/products', {params:{query : query}}).then(function(response)
                    {
                        return response.data;
                    });
    };
    $scope.onSelect = function ($item) {
	    $scope.$item = $item;
	    $location.path('/products/' + $scope.$item.id);
	};
});