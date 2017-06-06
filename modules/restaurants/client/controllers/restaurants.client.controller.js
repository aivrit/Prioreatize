(function () {
  'use strict';

  // Restaurants controller
  angular
    .module('restaurants')
    .controller('RestaurantsController', RestaurantsController);

  RestaurantsController.$inject = ['ReviewsService', '$scope', '$state', '$window', 'Authentication', 'restaurantResolve'];

  function RestaurantsController (ReviewsService, $scope, $state, $window, Authentication, restaurant) {
    var vm = this;
    vm.authentication = Authentication;
    vm.restaurant = restaurant;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    $scope.getrange = function(n) {
      var count = [];
      for (var i = 0; i < Math.floor(n); i++) {
        count.push(i);
      }
      return count;
    };

    vm.reviews = ReviewsService.query();

    // Remove existing Restaurant
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.restaurant.$remove($state.go('restaurants.list'));
      }
    }

    // Save Restaurant
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.restaurantForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.restaurant._id) {
        vm.restaurant.$update(successCallback, errorCallback);
      } else {
        vm.restaurant.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('restaurants.view', {
          restaurantId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
