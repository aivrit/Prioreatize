(function () {
  'use strict';

  angular
    .module('packageps')
    .controller('PackagepsListController', PackagepsListController);

  PackagepsListController.$inject = ['PackagepsService'];

  function PackagepsListController(PackagepsService) {
    var vm = this;

    vm.packageps = PackagepsService.query();
  }
}());
