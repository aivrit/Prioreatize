(function () {
  'use strict';

  angular
    .module('d3s')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'D3s',
      state: 'd3s',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'd3s', {
      title: 'List D3s',
      state: 'd3s.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'd3s', {
      title: 'Create D3',
      state: 'd3s.create',
      roles: ['user']
    });
  }
}());
