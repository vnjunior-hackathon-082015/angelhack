'use strict';

/**
 * @ngdoc function
 * @name inceptionApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the inceptionApp
 */
angular.module('inceptionApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
