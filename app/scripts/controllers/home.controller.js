'use strict';

/**
 * @ngdoc function
 * @name inceptionApp.controller:HomeController
 * @description
 * # HomeController
 * Controller of the inceptionApp
 */
 angular.module('inceptionApp')
 .controller('HomeController', function($scope, $log, commonShareService){
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

    $scope.ideas = commonShareService.getIdeas();


});


