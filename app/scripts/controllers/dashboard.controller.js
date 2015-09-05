/**
 * Created by s727223 on 04/09/2015.
 */
 (function(){
  'use strict';

  angular
    .module('inceptionApp')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', '$mdDialog', '$rootScope', 'commonShareService'];

  function DashboardController($scope, $mdDialog, $rootScope, commonShareService){
    var vm = this;
    $rootScope.activeTab = 'dashboard';
    vm.createIdea = createIdea;


    //==================== Function declaration ====================
    $scope.ideaArray = commonShareService.getIdeas();

  function createIdea(event){
      $mdDialog.show({
        controller: "CreateIdeaController",
        controllerAs: "vm",
        templateUrl: 'views/create-idea.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose:false
      })
        .then(function(answer) {
          // getTripsData().then(function(){
          //   initTripsProperty();
          // });
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };
  }



})();

