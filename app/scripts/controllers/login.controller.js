'use strict';

angular.module('inceptionApp')
  .controller('LoginController', LoginController);


   function LoginController($scope, $timeout, $rootScope, $state, commonShareService, blockUI) {
      var vm = this;
      vm.login = login;

      activate();
      //==================== Function declaration ====================
      function activate(){
        $rootScope.activeTab = 'login';
      }

      function login(){
        vm.message = '';
        vm.isLoggedIn = false;
        var username = vm.name.toLowerCase();
        var password = vm.password.toUpperCase();

        var loginInfos = commonShareService.getUsers();
        var isLoggedIn = false;
        for(var i = 0; i < loginInfos.length; i++){
          var info = loginInfos[i];
          if(info.username === username && info.password === password){
            commonShareService.setLoginInfo(info);
            $rootScope.loginInfo = commonShareService.getLoginInfo();
            vm.isLoggedIn = true;
            vm.message = 'Login Success';
            break;
          }
        }
        if(vm.isLoggedIn){
          blockUI.start();
          $timeout(function(){
            blockUI.stop();
            $state.go('dashboard');
          }, 1500);
        } else {
          vm.message = 'You enter wrong username or password';
        }
      }
    }
