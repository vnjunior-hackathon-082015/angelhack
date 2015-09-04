'use strict';

/**
 * @ngdoc function
 * @name inceptionApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inceptionApp
 */
angular.module('inceptionApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
