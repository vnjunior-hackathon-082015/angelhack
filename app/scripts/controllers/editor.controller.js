'use strict';

/**
 * @ngdoc function
 * @name inceptionApp.controller:EditorController
 * @description
 * # EditorController
 * Controller of the inceptionApp
 */
 angular.module('inceptionApp')
 .controller('EditorController', function($log, commonShareService){
    var vm = this;
    vm.editorOptions1 = {
        language: 'en',
        uiColor: '#000000'
    };
    vm.editorOptions2 = {
        language: 'en',
        uiColor: '#000000'
    };
    vm.editorOptions3 = {
        language: 'en',
        uiColor: '#000000'
    };

    vm.onShowClick = function(){
        $log.debug('vm.modelName1', vm.modelName1);
        $log.debug('vm.modelName2', vm.modelName2);
        $log.debug('vm.modelName3', vm.modelName3);
    };


});


