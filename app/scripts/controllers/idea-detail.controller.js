/**
 * Created by s727223 on 04/09/2015.
 */

angular.module('inceptionApp')
  .controller('IdeaDetailController', function(commonShareService, $mdDialog, $scope){
    var vm = this;

    vm.showEditHistory = showEditHistory;

    function showEditHistory(ev, history){
      var a = history;
      var hung = 'Hunafsafasfg';
      //$mdDialog.show({
      //  clickOutsideToClose: true,
      //  scope: this,
      //  preserveScope: true,
      //  template:
      //  '<md-dialog>' +
      //  '  <md-dialog-content>Hello {{hung}}!</md-dialog-content>' +
      //  '</md-dialog>',
      //  controller: function EditHistory() {
      //
      //  }
      //});
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

    init();
    var ideas;


    function init(){
      ideas = commonShareService.getIdeas();
      vm.selectedIdea = ideas[0];
    }
  });
