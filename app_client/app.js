(function () {
  
angular.module('flightApp',['ngRoute', 'ngSanitize', 'ui.bootstrap', 'LocalStorageModule']);

config.$inject = ['$routeProvider', '$locationProvider', 'localStorageServiceProvider'];
function config ($routeProvider, $locationProvider, localStorageServiceProvider) {

  $routeProvider
  .when('/', {
      templateUrl: 'login/login.view.html',
      controller: 'loginCtrl',
      controllerAs: 'vm'
    })
    .when('/home', {
      templateUrl: 'home/home.view.html',
      controller: 'homeCtrl',
      controllerAs: 'vm'
    })
    .when('/logs', {
      templateUrl: 'common/views/logs.view.html',
      controller: 'logsCtrl',
      controllerAs: 'vm'
    })
    .otherwise({redirectTo: '/'});

    //remove gnarly /#/ from html route
    $locationProvider.html5Mode(true);

    //Configure local storage
    localStorageServiceProvider
      .setStorageType('localStorage');
}

angular
  .module('flightApp')
  .config(['$routeProvider', '$locationProvider', 'localStorageServiceProvider', config]);
})();