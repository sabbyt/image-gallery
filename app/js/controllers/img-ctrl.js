var angular = require('angular');

module.exports = function(app) {
  app.controller('ImgController', ['$scope', '$http', function($scope, $http) {
    $scope.images = [];

    $scope.getAllImages = function() {
      $http.get('http://localhost:3000/api/images')
        .then((res) => {
          console.log('success getting!');
          $scope.images = res.data;
        }, (err) => {
          console.log(err);
        });
    };

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
};
