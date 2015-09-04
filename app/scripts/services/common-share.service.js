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
      var _loginInfo = null;

        return {
            getLoginInfo: getLoginInfo,
            setLoginInfo: setLoginInfo
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
    }

})();





