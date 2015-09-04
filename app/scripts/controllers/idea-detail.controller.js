/**
 * Created by s727223 on 04/09/2015.
 */

angular.module('inceptionApp')
  .controller('IdeaDetailController', function(commonShareService, $mdDialog, $scope){
    var vm = this;

    vm.showEditHistory = showEditHistory;
    vm.showAddCategory = showAddCategory;

    init();
    var ideas;


    function init(){
      ideas = commonShareService.getIdeas();
      vm.selectedIdea = ideas[0];
    }

    function showEditHistory(ev, history){
      $mdDialog.show({
        clickOutsideToClose: true,
        targetEvent: ev,
        template:
        '<md-dialog class="dialog-history" aria-label="List dialog">' +
        '  <md-dialog-content>'+
        '    <div class="title">Edit History:</div>' +
        '    <div class="edited" ng-repeat="item in items">' +
        '       <span>{{item.createDate}}</span>'  +
        '       <span>{{item.description}}</span>'  +
        '    </div>'  +
        '  </md-dialog-content>' +
        '</md-dialog>',
        locals: {
          items: history
        },
        controller: DialogController
      });
      function DialogController($scope, $mdDialog, items) {
        $scope.items = items;
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }
      }
    };

    function showAddCategory(ev, data){
      $mdDialog.show({
        clickOutsideToClose: true,
        targetEvent: ev,
        templateUrl: 'views/add-category.html',
        locals: {
          data: data
        },
        controller: 'AddCategoryController'
      });
    };
  });
