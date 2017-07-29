(function () {
  'use strict';

  // Restaurants controller
  angular
    .module('restaurants')
    .controller('RestaurantsController', RestaurantsController);

  RestaurantsController.$inject = ['ReviewsService', 'GoogleMapsService', '$scope', '$state', '$window', 'Authentication', 'restaurantResolve'];

  function RestaurantsController (ReviewsService, GoogleMapsService, $scope, $state, $window, Authentication, restaurant) {
    var vm = this;
    vm.authentication = Authentication;
    vm.restaurant = restaurant;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    $scope.getrange = function(n) {
      var count = [];
      for (var i = 0; i < n; i++) {
        count.push(i);
      }
      return count;
    };

    // GoogleMapsService.initMap({ 'lat': vm.restaurant.latitude, 'lng': vm.restaurant.longitude });
    // GoogleMapsService.query();
    $scope.initMap = function() {
      alert('LOL');
      console.log('LOL');
      console.log(vm.restaurant);
      var uluru = {lat: vm.restaurant.latitude, lng: vm.restaurant.longitude};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
      });
      alert(map);
      console.log(map);
      var marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
      alert(marker);
      console.log(marker);
    };

    vm.reviews = ReviewsService.query({ id: restaurant._id });

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

  angular.module('restaurants').filter('round', function () {
    return function (num) {
      return Math.round(num);
    };
  });

  angular.module('restaurants').filter('floor', function () {
    return function (num) {
      return Math.floor(num);
    };
  });

  angular.module('restaurants').filter('modulu', function () {
    return function (num) {
      return num % 1 !== 0 ? 1 : 0;
    };
  });
}());
