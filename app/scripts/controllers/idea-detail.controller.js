/**
 * Created by s727223 on 04/09/2015.
 */

angular.module('inceptionApp')
  .controller('IdeaDetailController', function(commonShareService, $log, $mdDialog, $scope){
    var vm = this;

    vm.showEditHistory = showEditHistory;
    vm.showAddCategory = showAddCategory;
    vm.addNewComment = addNewComment;
    vm.showEditSection = showEditSection;
    vm.thumpIdea = thumpIdea;

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

    function showEditSection(ev, ideaId, categoryId, sectionId, value){
      $mdDialog.show({
        clickOutsideToClose: true,
        targetEvent: ev,
        template:
        '<md-dialog class="dialog-category" aria-label="List dialog">' +
        '  <md-dialog-content>'+
        '    <md-input-container>'+
        '     <label>Edit section</label>' +
        '     <input ng-model="editSection" type="text">' +
        '   </md-input-container>' +
        '  </md-dialog-content>' +
        '  <div class="md-actions">'+
        '   <md-button ng-click="closeDialog()" class="md-warn">Cancel</md-button>'+
        '   <md-button ng-click="submit()" class="md-primary">OK</md-button>'+
        '  </div>'+
        '</md-dialog>',
        locals: {
          ideaId: ideaId,
          categoryId: categoryId,
          sectionId: sectionId,
          value: value
        },
        controller: EditSectionController
      });
      function EditSectionController($scope, $mdDialog, ideaId, categoryId, sectionId, value) {
        $scope.ideaId = ideaId;
        $scope.categoryId = categoryId;
        $scope.sectionId = sectionId;
        $scope.editSection = value;
        $scope.closeDialog = function() {
          $mdDialog.hide();
        };
        $scope.submit = function() {

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
          data: data,
          commonShareService: commonShareService
        },
        controller: 'AddCategoryController'
      });
    };

    function addNewComment(ideaId, categoryId, sectionId){
      $log.debug(ideaId, categoryId, sectionId);
      var newComment = vm['newComment_' + ideaId + '_' + categoryId+ '_' + sectionId];
      if (newComment  != undefined && newComment != ""){
        commonShareService.commentIdea(newComment, ideaId, categoryId, sectionId);
        vm['newComment_' + ideaId + '_' + categoryId+ '_' + sectionId] = "";
      };
    }

    function thumpIdea(isThumpUp, ideaId, categoryId, sectionId){
      commonShareService.thumpIdea(isThumpUp, ideaId, categoryId, sectionId);
    }
  });
