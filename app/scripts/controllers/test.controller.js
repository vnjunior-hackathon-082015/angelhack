'use strict';

/**
 * @ngdoc function
 * @name inceptionApp.controller:TestPageController
 * @description
 * # TestPageController
 * Controller of the inceptionApp
 */
 angular.module('inceptionApp')
 .controller('TestPageController', function($log, commonShareService){
    var vm = this;
    vm.ideas = commonShareService.getIdeas();
    vm.thumUp = thumUp;
    vm.thumDown = thumDown;
    vm.addCategory = addCategory;
    vm.comment = comment;
    vm.addIdea = addIdea;


    //==================== Function Declaration ====================
    function thumUp(){
        var isThumpUp = true,
            ideaId = 1,
            categoryId = 1,
            sectionId = 1;

        commonShareService.thumpIdea(isThumpUp, ideaId, categoryId, sectionId);
    }

    function thumDown(){
        var isThumpUp = false,
            ideaId = 1,
            categoryId = 1,
            sectionId = 1;

        commonShareService.thumpIdea(isThumpUp, ideaId, categoryId, sectionId);
    }

    function comment(){
        var comment =  'New comment added',
            ideaId =  1,
            categoryId = 1,
            sectionId = 1;
        commonShareService.commentIdea(comment, ideaId, categoryId, sectionId);
    }

    function addCategory(){
        var ideaId =  1,
            name =  'New Category added',
            type =  1,
            sectionValues = [];

        sectionValues.push('New section 1 added');
        sectionValues.push('New section 2 added');
        sectionValues.push('New section 3 added');
        sectionValues.push('New section 4 added');

        commonShareService.addCategory(ideaId, name, type, sectionValues);
    }

    function addIdea(){
        var title = 'New idea added',
            description = 'New idea description added',
            labels = ['sale', 'test', 'idea added'],
            privacy = 'public',
            categoriesParam = [];

        categoriesParam.push({
            "name": "Category 1",
            "sections": [
                {
                    "privacy": "public",
                    "description": "New Category 1 Section 1 added"
                },
                {
                    "privacy": "onlyme",
                    "description": "New Category 1 Section 2 added"
                }
            ]
        });

        categoriesParam.push({
            "name": "Category 2",
            "sections": [
                {
                    "privacy": "public",
                    "description": "New Category 2 Section 1 added"
                }
            ]
        });

        commonShareService.addIdea(title, description, labels, privacy, categoriesParam);
    }

});


