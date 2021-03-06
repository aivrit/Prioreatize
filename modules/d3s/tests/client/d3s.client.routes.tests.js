(function () {
  'use strict';

  describe('D3s Route Tests', function () {
    // Initialize global variables
    var $scope,
      D3sService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _D3sService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      D3sService = _D3sService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('d3s');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/d3s');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          D3sController,
          mockD3;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('d3s.view');
          $templateCache.put('modules/d3s/client/views/view-d3.client.view.html', '');

          // create mock D3
          mockD3 = new D3sService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'D3 Name'
          });

          // Initialize Controller
          D3sController = $controller('D3sController as vm', {
            $scope: $scope,
            d3Resolve: mockD3
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:d3Id');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.d3Resolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            d3Id: 1
          })).toEqual('/d3s/1');
        }));

        it('should attach an D3 to the controller scope', function () {
          expect($scope.vm.d3._id).toBe(mockD3._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/d3s/client/views/view-d3.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          D3sController,
          mockD3;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('d3s.create');
          $templateCache.put('modules/d3s/client/views/form-d3.client.view.html', '');

          // create mock D3
          mockD3 = new D3sService();

          // Initialize Controller
          D3sController = $controller('D3sController as vm', {
            $scope: $scope,
            d3Resolve: mockD3
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.d3Resolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/d3s/create');
        }));

        it('should attach an D3 to the controller scope', function () {
          expect($scope.vm.d3._id).toBe(mockD3._id);
          expect($scope.vm.d3._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/d3s/client/views/form-d3.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          D3sController,
          mockD3;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('d3s.edit');
          $templateCache.put('modules/d3s/client/views/form-d3.client.view.html', '');

          // create mock D3
          mockD3 = new D3sService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'D3 Name'
          });

          // Initialize Controller
          D3sController = $controller('D3sController as vm', {
            $scope: $scope,
            d3Resolve: mockD3
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:d3Id/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.d3Resolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            d3Id: 1
          })).toEqual('/d3s/1/edit');
        }));

        it('should attach an D3 to the controller scope', function () {
          expect($scope.vm.d3._id).toBe(mockD3._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/d3s/client/views/form-d3.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
