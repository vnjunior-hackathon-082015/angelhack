'use strict';

/**
 * @ngdoc overview
 * @name inceptionApp
 * @description
 * # inceptionApp
 *
 * Main module of the application.
 */
angular
  .module('inceptionApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'ui.router',
    'ui.bootstrap',
    'vAccordion',
    'ui.bootstrap.datetimepicker',
    'blockUI'
  ])
  .config(function ($routeProvider, $urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home',{
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      })
      .state('dashboard',{
        url: '/dashboard',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'vm'
      })
      ;
  })
  .config(function($mdIconProvider){
    $mdIconProvider
       .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
       .defaultIconSet('img/icons/sets/core-icons.svg', 24);
  })
  .run(function($rootScope, $state, blockUIConfig, commonShareService){
    activate();

    //==================== Function declaration ====================
    function activate(){
      $rootScope.$on("$stateChangeSuccess", function (event, tostate, toParams, fromState, fromParams) {
          $rootScope.loginInfo = commonShareService.getLoginInfo();
      });

      //Config BlockUI
      blockUIConfig.message = 'Please wait';
      // Disable automatically blocking of the user interface
      blockUIConfig.autoBlock = false;
      blockUIConfig.templateUrl = 'views/block-ui-overlay.html';
    }
  })
;
