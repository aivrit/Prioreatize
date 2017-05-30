(function () {
  'use strict';

  angular
    .module('restaurants')
    .controller('RestaurantsListController', RestaurantsListController);

  RestaurantsListController.$inject = ['RestaurantsService', '$scope', '$route', '$routeParams'];

  function RestaurantsListController(RestaurantsService, $scope, $route, $routeParams) {
    var vm = this;
    var params = $routeParams;
    vm.params = params;
    vm.restaurants = RestaurantsService.query();
  }
}());
