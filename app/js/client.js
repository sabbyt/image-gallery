const angular = require('angular');
const imagesApp = angular.module('imagesApp', []);

imagesApp.controller('imagesController', ['$scope', '$http', ($scope, $http) => {
  $scope.images = [];

  $http.get('http://localhost:3000/api/images')
    .then((res) => {
      console.log('success getting!');
      $scope.images = res.data;
    }, (err) => {
      console.log(err);
    });

  $scope.createImage = (image) => {
    $http.post('http://localhost:3000/api/images', image)
      .then((res) => {
        console.log('success posting!');
        $scope.images.push(res.data);
        $scope.newImage = null;
      }, (err) => {
        console.log(err);
      });
  };
}]);
