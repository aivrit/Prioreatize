'use strict';

describe('Packageps E2E Tests:', function () {
  describe('Test Packageps page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/packageps');
      expect(element.all(by.repeater('packagep in packageps')).count()).toEqual(0);
    });
  });
});
