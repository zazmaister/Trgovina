angular.module('app').controller('SliderController', function ($scope,ProductFactory) {
  $scope.myInterval = 5000;
  var slides = $scope.slides = [];




  var temp = [];
  temp[0] = ProductFactory.getProductFromREST().get({id:58},function(success){
    slides.push(temp[0]);
  });
  temp[1] = ProductFactory.getProductFromREST().get({id:21},function(success){
    slides.push(temp[1]);
  });
  temp[2] = ProductFactory.getProductFromREST().get({id:25},function(success){
    slides.push(temp[2]);
  });
  temp[3] = ProductFactory.getProductFromREST().get({id:6},function(success){
    slides.push(temp[3]);
  });
  temp[4] = ProductFactory.getProductFromREST().get({id:26},function(success){
    slides.push(temp[4]);
  });

});