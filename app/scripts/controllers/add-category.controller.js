/**
 * Created by s727223 on 04/09/2015.
 */

angular.module('inceptionApp')
  .controller('AddCategoryController', function($scope, $mdDialog, data, commonShareService){
    $scope.data = data;
    $scope.newSections = [];
    $scope.newCategory = "";
    $scope.addNewSection = function(input){
      if ($scope.newSectionInput != undefined && $scope.newSectionInput != '') {
        $scope.newSections.push(input);
        $scope.newSectionInput = "";
      }
    };
    $scope.removeSection = function(index){
      $scope.newSections.splice(index, 1);
    };
    $scope.closeDialog = function() {
      $mdDialog.hide();
    }
    $scope.submit = function() {
      commonShareService.addCategory(data, $scope.newCategory, 1, $scope.newSections);
      $mdDialog.hide();
    }
  });
