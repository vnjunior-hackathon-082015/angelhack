(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name inceptionApp.service:commonShareService
     * @description
     * # commonShareService
     */
    angular.module('inceptionApp')
      .service('commonShareService', commonShareService);

    commonShareService.$inject = ['$http', '$window'];

    function commonShareService($http, $window) {
      var _loginInfo = null,
          _ideas;

        return {
            getLoginInfo: getLoginInfo,
            setLoginInfo: setLoginInfo,
            getUsers: getUsers,
            getIdeas: getIdeas,
            setIdeas: setIdeas,
            thumpIdea: thumpIdea,
            commentIdea: commentIdea,
            addCategory: addCategory,
            addIdea: addIdea,
            editSection: editSection,
            searchIdeas: searchIdeas
        };

        //==================== Function declaration ====================
        function getUsers(){
          return angular.copy(data_users);
        }

        function getLoginInfo(){
          if (!_loginInfo) {
            var param = $window.sessionStorage.loginInfo;
            _loginInfo = param ? JSON.parse(param) : undefined;
          }
          return _loginInfo;
        }

        function setLoginInfo(param){
          var str = param;
          if (param) {
              str = JSON.stringify(param);
          }
          _loginInfo = param;
          $window.sessionStorage.loginInfo = str;
        }

        function getIdeas(){
          if (!_ideas) {
            var value = $window.sessionStorage.ideas;
            _ideas = value ? JSON.parse(value) : angular.copy(data_ideas);
          }
          return _ideas;
        }

        function setIdeas(param){
          var str = param;
          if (param) {
              str = JSON.stringify(param);
          }
          _ideas = param;
          if(param === null){
            $window.sessionStorage.removeItem('ideas');
          } else{
            $window.sessionStorage.ideas = str;
          }
        }

        function thumpIdea(isThumpUp, ideaId, categoryId, sectionId){
          var ideas = getIdeas(),
            i, j, k;
          for(i = 0; i < ideas.length; i++){
            if(ideas[i].id == ideaId){
              var categories = ideas[i].categories;
              for(j = 0; j < categories.length; j++){
                if(categories[j].id == categoryId){
                  var sections = categories[j].sections;
                  for(k = 0; k < sections.length; k++){
                    if(sections[k].id == sectionId){
                      if(isThumpUp){
                        sections[k].thumpUp++;
                      } else{
                        sections[k].thumpDown++;
                      }

                      setIdeas(ideas);
                    }
                  }
                }
              }
            }
          }
        }

        function commentIdea(comment, ideaId, categoryId, sectionId){
          var ideas = getIdeas(),
            i, j, k;
          for(i = 0; i < ideas.length; i++){
            if(ideas[i].id == ideaId){
              var categories = ideas[i].categories;
              for(j = 0; j < categories.length; j++){
                if(categories[j].id == categoryId){
                  var sections = categories[j].sections;
                  for(k = 0; k < sections.length; k++){
                    if(sections[k].id == sectionId){

                      var commentObj = {
                          "id": sections[k].comments.length+1,
                          "value": comment,
                          "owner": {
                              "name": "Hung Thai",
                              "avatarURL": "../images/avatar/hung_thai.jpg"
                          }
                      };
                      sections[k].comments.push(commentObj);

                      setIdeas(ideas);
                    }
                  }
                }
              }
            }
          }
        }


        function addCategory(ideaId, name, type, sectionValues){
          var ideas = getIdeas(),
            i, j, k;
          for(i = 0; i < ideas.length; i++){
            if(ideas[i].id == ideaId){
              var categories = ideas[i].categories;

              var sections = [];

              for(j = 0 ; j < sectionValues.length; j++) {
                var obj = {
                    "id": (j + 1),
                    "thumpUp": 0,
                    "thumpDown": 0,
                    "privacy": "public",
                    "history": [
                        {
                            "description": sectionValues[j],
                            "createDate": toDateString(new Date())
                        }
                    ],
                    "comments": []
                };

                sections.push(obj);
              }

              var categoryObj = {
                "id": categories.length + 1,
                "name": name,
                "type": type,
                "sections": sections
              };
              categories.push(categoryObj);

              setIdeas(ideas);
            }
          }
        }

        function addIdea(title, description, labels, privacy, categoriesParam){
          var i,j,
              ideas = getIdeas(),
              ownerName = 'Dat Nguyen',
              createDate = toDateString(new Date()),
              categories = [];

          for(i = 0; i < categoriesParam.length; i++){
            var categoryObj = {
                "id": i + 1,
                "name": categoriesParam[i].name,
                "type": 1,
                "sections": []
            };
            var sections = [];
            for(j = 0; j < categoriesParam[i].sections.length; j++){
              var sectionObj = {
                  "id": j + 1,
                  "thumpUp": 0,
                  "thumpDown": 0,
                  "privacy": categoriesParam[i].sections[j].privacy,
                  "history": [
                      {
                          "description": categoriesParam[i].sections[j].description,
                          "createDate": createDate
                      }
                  ],
                  "comments": []
              };
              categoryObj.sections.push(sectionObj);
            }
            categories.push(categoryObj);
          }

          var ideaObj = {
              "id": ideas.length + 1,
              "title": title,
              "ownerName": ownerName,
              "description": description,
              "thumpUp": 0,
              "thumpDown": 0,
              "possibility": 100,
              "createDate": createDate,
              "modifyDate": createDate,
              "labels": labels,
              "privacy": privacy,
              "categories": categories
          };
          ideas.push(ideaObj);
          setIdeas(ideas);

        }

        function editSection(description, ideaId, categoryId, sectionId){
          var ideas = getIdeas(),
            i, j, k;
          for(i = 0; i < ideas.length; i++){
            if(ideas[i].id == ideaId){
              var categories = ideas[i].categories;
              for(j = 0; j < categories.length; j++){
                if(categories[j].id == categoryId){
                  var sections = categories[j].sections;
                  for(k = 0; k < sections.length; k++){
                    if(sections[k].id == sectionId){
                      sections[k].history.push({
                        "description": description,
                        "createDate": toDateString(new Date())
                      });
                      setIdeas(ideas);
                    }
                  }
                }
              }
            }
          }
        }

        function searchIdeas(searchTexts, isOnlyLabel){
          var ideas = getIdeas(),
            i, j, k;
          var result = [];
          for(i = 0; i < ideas.length; i++){
            for(j = 0; j < searchTexts.length; j++){
              var searchText = searchTexts[j].toLowerCase().trim();
              if(isOnlyLabel){
                if(isInLabels(searchText, ideas[i].labels)){
                  result.push(ideas[i]);
                  break;
                }
              } else{
                if(ideas[i].title.toLowerCase().indexOf(searchText) > -1
                  || ideas[i].description.toLowerCase().indexOf(searchText) > -1
                  || isInLabels(searchText, ideas[i].labels)){
                  result.push(ideas[i]);
                  break;
                }
              }
            }
          }
          return result;
        }

        function isInLabels(searchText, labels){
          var result = false,
              i;
          for(i = 0; i < labels.length; i++){
            if(labels[i].toLowerCase() == searchText.toLowerCase()){
              return true;
            }
          }
          return false;
        }

        function toDateString(date){
          var month = date.getMonth()+1;
          var dayInMonth = date.getDate();
          var year = date.getFullYear();
          var hour = date.getHours();
          var minute = date.getMinutes();
          var second = date.getSeconds();

          return [year,
                  (month < 10)?('0'+ month):month,
                   (dayInMonth < 10)?('0'+ dayInMonth):dayInMonth
                   ].join('-')+' '+
                  [(hour < 10)?('0'+ hour):hour,
                   (minute < 10)?('0'+ minute):minute,
                   (second < 10)?('0'+ second):second].join(':');
        }
    }

})();





