'use strict';

/**
 * @ngdoc function
 * @name yohereApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yohereApp
 */
angular.module('yohereApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
