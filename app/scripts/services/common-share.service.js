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
            setIdeas: setIdeas
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
    }

})();





