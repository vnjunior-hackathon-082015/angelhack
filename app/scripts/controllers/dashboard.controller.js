/**
 * Created by s727223 on 04/09/2015.
 */
 (function(){
  'use strict';

  angular
    .module('inceptionApp')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', '$mdDialog', '$rootScope', '$state', 'commonShareService'];

  function DashboardController($scope, $mdDialog, $rootScope, $state, commonShareService){
    var vm = this;
    vm.createIdea = createIdea;
    vm.searchTags = [];
    vm.searchIdeas = searchIdeas;
    vm.thumpIdea = thumpIdea;
    vm.suggestLabels = [];
    vm.viewDetail = viewDetail;
    activate();


    //==================== Function declaration ====================
    function activate(){
      $rootScope.activeTab = 'dashboard';
      // vm.ideaArray = commonShareService.getIdeas();
      searchIdeas();

      vm.suggestLabels.push('sale');
      vm.suggestLabels.push('restaurant');
      vm.suggestLabels.push('bussiness');
      vm.suggestLabels.push('startup');
      vm.suggestLabels.push('security');
      vm.suggestLabels.push('hand made');
    }



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
      }, function() {
        // vm.status = 'You cancelled the dialog.';
      });
    }

    function searchIdeas(){
      var isOnlyLabel = false;
      vm.ideas = commonShareService.searchIdeas(vm.searchTags, isOnlyLabel);
    }

    function thumpIdea(isThumpUp, ideaId){
      commonShareService.thumpIdea(isThumpUp, ideaId);
    }

    function viewDetail(idea){
      commonShareService.setCurrentIdea(idea);
      $state.go('idea-detail');
    }
  }



})();

