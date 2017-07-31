(function () {
  'use strict';

  angular
    .module('restaurants')
    .controller('RestaurantsListController', RestaurantsListController);

  RestaurantsListController.$inject = ['RestaurantsService', 'D3sService', '$scope', '$route', '$routeParams', '$location', 'orderByFilter'];

  function RestaurantsListController(RestaurantsService, D3sService, $scope, $route, $routeParams, $location, orderBy) {
    var vm = this;
    var params = $routeParams;
    vm.params = params;
    var alt = $location.search();
    $scope.dataHasLoaded = false;
    vm.restaurants = RestaurantsService.query(alt, function() {
      var reverseSort = true;
      $scope.data = orderBy(vm.restaurants, 'review_count', reverseSort).slice(0, 10);
      $scope.dataHasLoaded = true;
    });
  }
}());
