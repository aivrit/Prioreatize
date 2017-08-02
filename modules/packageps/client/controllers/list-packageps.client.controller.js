(function () {
  'use strict';

  angular
    .module('packageps')
    .controller('PackagepsListController', PackagepsListController);

  PackagepsListController.$inject = ['$scope', 'PackagepsService', 'Authentication'];

  function PackagepsListController($scope, PackagepsService, Authentication) {
    var vm = this;

    vm.packageps = PackagepsService.query();

    $scope.edit = function edit(id) {
      window.location.href = '/packageps/' + id + '/edit';
    };
    $scope.userfilter = function userfilter(item) {
      if (item.hasOwnProperty('userr')){
        if (!Authentication.user) {
          return false;
        }
        if (item.userr !== Authentication.user.username) {
          return false;
        }
        return true;
      }
      return false;
    };
  }
}());
