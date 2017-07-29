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
          document.getElementById(category + priorities[category]).parentElement.className += " cradio";
          for (var j = 0; j < 3; j++) {
            if (j != priorities[category]) {
              document.getElementById((category + j)).parentElement.classList.remove("cradio");
            }
          }
        }
      }
    };

    $scope.changeRadio = function changeRadio(id) {
        document.getElementById(id).parentElement.className += " cradio";
        for (var i = 0; i < 3; i++) {
          if ((id.substring(0, id.length - 1) + i) != id) {
            document.getElementById((id.substring(0, id.length - 1) + i)).parentElement.classList.remove("cradio");
          }
        }
    };
  }

}());
