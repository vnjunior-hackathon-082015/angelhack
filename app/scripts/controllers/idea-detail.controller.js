/**
 * Created by s727223 on 04/09/2015.
 */

angular.module('inceptionApp')
  .controller('IdeaDetailController', function(commonShareService, $log,
        $mdDialog, $scope, $rootScope, $stateParams, $document, $modal){
    var vm = this;
    $rootScope.activeTab = 'idea-detail';
    vm.showEditHistory = showEditHistory;
    vm.showAddCategory = showAddCategory;
    vm.addNewComment = addNewComment;
    vm.showEditSection = showEditSection;
    vm.thumpSection = thumpSection;
    vm.showHideMindMap = showHideMindMap;

    init();
    var ideas;
    function init(){
      // ideas = commonShareService.getIdeas();
      vm.selectedIdea = commonShareService.getCurrentIdea();
      vm.loginInfo = commonShareService.getLoginInfo();
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
        '   <md-input-container ng-if="!loginInfo.isUpgraded">'+
        '    <label>Edit section</label>' +
        '    <input ng-model="$parent.editSection" type="text">' +
        '  </md-input-container>' +
        '  <textarea id="ckeditor-edit-section" ckeditor="editorOptions" ng-model="$parent.editSection" ng-if="loginInfo.isUpgraded"></textarea>' +
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
          value: value,
          loginInfo: $rootScope.loginInfo
        },
        controller: EditSectionController
      });
      function EditSectionController($scope, $mdDialog, ideaId, categoryId, sectionId, value, loginInfo) {
        $scope.editorOptions = {
            language: 'en',
            uiColor: '#000000'
        };
        $scope.loginInfo = loginInfo;
        $scope.ideaId = ideaId;
        $scope.categoryId = categoryId;
        $scope.sectionId = sectionId;
        $scope.editSection = value;
        $scope.closeDialog = function() {
          $mdDialog.hide();
        };
        $scope.submit = function() {
          commonShareService.editSection($scope.editSection,  $scope.ideaId, $scope.categoryId, $scope.sectionId);
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
          commonShareService: commonShareService,
          loginInfo: $rootScope.loginInfo
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

    function thumpSection(isThumpUp, ideaId, categoryId, sectionId){
      vm.selectedIdea = commonShareService.thumpSection(isThumpUp, ideaId, categoryId, sectionId);
    }

    function showHideMindMap(ev){
      // $mdDialog.show({
      //   clickOutsideToClose: true,
      //   targetEvent: ev,
      //   templateUrl: 'views/mind-map.html',
      //   controller: 'MindmapController'
      // });
      // angular.element($document[0].querySelectorAll('#mind-map-modal')).modal("show");
      vm.isShowMindMap = !vm.isShowMindMap;
    }
  });
