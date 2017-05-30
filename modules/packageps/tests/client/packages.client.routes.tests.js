(function () {
  'use strict';

  describe('Packageps Route Tests', function () {
    // Initialize global variables
    var $scope,
      PackagepsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _PackagepsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      PackagepsService = _PackagepsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('packageps');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/packageps');
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
          PackagepsController,
          mockPackagep;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('packageps.view');
          $templateCache.put('modules/packageps/client/views/view-packagep.client.view.html', '');

          // create mock Packagep
          mockPackagep = new PackagepsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Packagep Name'
          });

          // Initialize Controller
          PackagepsController = $controller('PackagepsController as vm', {
            $scope: $scope,
            packagepResolve: mockPackagep
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:packagepId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.packagepResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            packagepId: 1
          })).toEqual('/packageps/1');
        }));

        it('should attach an Packagep to the controller scope', function () {
          expect($scope.vm.packagep._id).toBe(mockPackagep._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/packageps/client/views/view-packagep.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          PackagepsController,
          mockPackagep;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('packageps.create');
          $templateCache.put('modules/packageps/client/views/form-packagep.client.view.html', '');

          // create mock Packagep
          mockPackagep = new PackagepsService();

          // Initialize Controller
          PackagepsController = $controller('PackagepsController as vm', {
            $scope: $scope,
            packagepResolve: mockPackagep
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.packagepResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/packageps/create');
        }));

        it('should attach an Packagep to the controller scope', function () {
          expect($scope.vm.packagep._id).toBe(mockPackagep._id);
          expect($scope.vm.packagep._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/packageps/client/views/form-packagep.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          PackagepsController,
          mockPackagep;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('packageps.edit');
          $templateCache.put('modules/packageps/client/views/form-packagep.client.view.html', '');

          // create mock Packagep
          mockPackagep = new PackagepsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Packagep Name'
          });

          // Initialize Controller
          PackagepsController = $controller('PackagepsController as vm', {
            $scope: $scope,
            packagepResolve: mockPackagep
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:packagepId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.packagepResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            packagepId: 1
          })).toEqual('/packageps/1/edit');
        }));

        it('should attach an Packagep to the controller scope', function () {
          expect($scope.vm.packagep._id).toBe(mockPackagep._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/packageps/client/views/form-packagep.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
