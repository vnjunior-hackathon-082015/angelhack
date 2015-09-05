'use strict';

/**
 * @ngdoc function
 * @name inceptionApp.controller:HomeController
 * @description
 * # HomeController
 * Controller of the inceptionApp
 */
 angular.module('inceptionApp')
 .controller('HomeController', function($scope, $interval, $log, $state, $rootScope, commonShareService){
    $rootScope.activeTab = 'home';
    // $scope.editorOptions1 = {
    //     language: 'en',
    //     uiColor: '#000000'
    // };
    // $scope.editorOptions2 = {
    //     language: 'en',
    //     uiColor: '#000000'
    // };
    // $scope.editorOptions3 = {
    //     language: 'en',
    //     uiColor: '#000000'
    // };

    // $scope.onShowClick = function(){
    //     $log.debug('$scope.modelName1', $scope.modelName1);
    //     $log.debug('$scope.modelName2', $scope.modelName2);
    //     $log.debug('$scope.modelName3', $scope.modelName3);
    // };
     $scope.bigBulpClass = 'big-buld-type-1';
    // $scope.bigBulpClass = 'big-buld-type-1';
    $interval(function(){
        var type = $scope.bigBulpClass[$scope.bigBulpClass.length-1];
        type = Number(type) + 1;
        if(type > 4){
            type = 1;
        }
        $scope.bigBulpClass = 'big-buld-type-' + type;
    }, 500);

    $scope.ideas = commonShareService.getIdeas();

    $scope.explore = function(){
        $state.go('dashboard');
    }

});


