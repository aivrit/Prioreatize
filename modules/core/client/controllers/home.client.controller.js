(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['CategoriesService', 'PackagepsService', '$scope'];

  function HomeController(CategoriesService, PackagepsService, $scope) {
    var vm = this;

    vm.packages = PackagepsService.query();
    vm.categories = CategoriesService.query();
    $scope.choosePackage = function choosePackage(pkg) {
      for (var i = 0; i < pkg.priorities.length; i++) {
        var priorities = pkg.priorities[i];
        for (var category in priorities) {
          Reflect.set(vm, category, priorities[category]);
        }
      }
    };
  }

}());
