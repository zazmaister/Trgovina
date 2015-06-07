angular.module('app').directive('appModal', function ()
{
    return {
        restrict:   'E',
        controller: "ShoppingCartController",
        template:   '<button class="btn btn-primary" ng-click="openModal()">Open modal</button>'
    };
});