'use strict';

/**
 * @ngdoc function
 * @name yohereApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yohereApp
 */
angular.module('yohereApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
