var angular = require('angular');

describe('images controller', function() {
  beforeEach(angular.mock.module('imagesApp'));

  var $httpBackend;
  var $scope;
  var $controller;

  beforeEach(angular.mock.inject(function($rootScope, _$controller_){
    $controller = _$controller_;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a controller', () => {
    $scope = {};
    var imgController = $controller('ImgController', { $scope: $scope });
    expect(typeof imgController).toBe('object');
    expect(Array.isArray($scope.images)).toBe(true);
    expect(typeof $scope.getAllImages).toBe('function');
  });

  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $scope = {};
      $controller('ImgController', { $scope: $scope });
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a GET request to /api/images', () => {
      $httpBackend.expectGET('http://localhost:3000/api/images').respond(200, [{link: 'test link'}]);
      $scope.getAllImages();
      $httpBackend.flush();
      expect($scope.images.length).toBe(1);
      expect($scope.images[0].link).toBe('test link');
    });

    it('should POST a new image', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/images', {link: 'the sent link'}).respond(200, {link: 'the response link'});
      $scope.newImage = {link: 'the new link'};
      $scope.createImage({link: 'the sent link'});
      $httpBackend.flush();
      expect($scope.images.length).toBe(1);
      expect($scope.newImage).toBe(null);
      expect($scope.images[0].link).toBe('the response link');
    });
  });
});
