const angular = require('angular');
const imagesApp = angular.module('imagesApp', []);

require('./controllers/img-ctrl')(imagesApp);
