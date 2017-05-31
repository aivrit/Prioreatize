(function () {
  'use strict';

  angular
    .module('restaurants')
    .controller('RestaurantsListController', RestaurantsListController);

  RestaurantsListController.$inject = ['RestaurantsService', '$scope', '$route', '$routeParams', '$location'];

  function RestaurantsListController(RestaurantsService, $scope, $route, $routeParams, $location) {
    var vm = this;
    var params = $routeParams;
    vm.params = params;
    var alt = $location.search();
    var params_dict = {};

    vm.restaurants = RestaurantsService.query(alt);
  }
}());
