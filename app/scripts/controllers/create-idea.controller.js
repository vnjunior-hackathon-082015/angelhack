/**
 * Created by s727223 on 04/09/2015.
 */
 (function(){
  'use strict';

  angular
    .module('inceptionApp')
    .controller('CreateIdeaController', CreateIdeaController);

  CreateIdeaController.$inject = ['$scope', '$mdDialog', '$timeout' ];

  function CreateIdeaController($scope, $mdDialog, $timeout){
    var vm = this;
    vm.cancel = cancel;
    vm.answer = answer;
    vm.loadPrivacyOptions = loadPrivacyOptions;
    vm.addSection = addSection;
    vm.addCategory = addCategory;
    vm.deleteCategory = deleteCategory;
    vm.deleteSection = deleteSection;
    vm.confirmIdea = confirmIdea;

    vm.ideaModel = {
                    "title": "",
                    "description": "",
                    "labels": "",
                    "privacy": "",
                    "categories": [
                        {
                            "name": "Introduction",
                            "sections": [
                                {
                                    "history": [
                                        {
                                            "description": "",
                                        }
                                    ],
                                    "comments": [
                                    ]
                                }
                            ]
                        }
                    ]
                };

    vm.ideaModel.labels = [];

    //==================== Function declaration ====================

    function loadPrivacyOptions() {
      // Use timeout to simulate a 650ms request.
      vm.privacyOptions = [];
      return $timeout(function() {
        vm.privacyOptions = [
          { name:'Only Me', icon:'lock' },
          { name:'Public', icon:'public' }
        ];
      }, 650);
    };

    function addSection(index){
      vm.ideaModel.categories[index].sections.push({
                                    "privacy": "",
                                    "history": [
                                        {
                                            "description": "",
                                        }
                                    ],
                                    "comments": [
                                    ]
                                });
    };

    function addCategory(name){
      vm.ideaModel.categories.push({
                            "name": name,
                            "type": 1,
                            "sections": [
                                {
                                    "privacy": "",
                                    "history": [
                                        {
                                            "description": "",
                                        }
                                    ],
                                    "comments": [
                                    ]
                                }
                            ]
                        });
    };

    function deleteCategory(index){
      if(vm.ideaModel.categories.length > 1){
        vm.ideaModel.categories.splice(index, 1);
      }
    };

    function deleteSection(parentIndex, index){
      if(vm.ideaModel.categories[parentIndex].sections.length > 1){
        vm.ideaModel.categories[parentIndex].sections.splice(index, 1);
      }
    };

    function confirmIdea(ideaModel){
      debugger;
    };

    function answer(ans) {
      $mdDialog.hide(ans);
    };

    function cancel(){
      $mdDialog.cancel();
    };
     
  }

})();

