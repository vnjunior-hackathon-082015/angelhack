'use strict';

/**
 * @ngdoc function
 * @name inceptionApp.controller:LogoutController
 * @description
 * # LogoutController
 * Controller of the inceptionApp
 */
angular.module('inceptionApp')
  .controller('LogoutController', function($scope, $rootScope, $state,$timeout, commonShareService, blockUI){
    commonShareService.setLoginInfo(null);
    $rootScope.loginInfo = null;

    blockUI.start();
    $timeout(function(){
        blockUI.stop();
        $state.go('home');
    }, 1500);
  });
