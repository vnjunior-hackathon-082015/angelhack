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
            getIdeas: getIdeas,
            setIdeas: setIdeas,
            thumpIdea: thumpIdea,
            commentIdea: commentIdea,
            addCategory: addCategory
        };

        //==================== Function declaration ====================
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





