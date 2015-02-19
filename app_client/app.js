(function () {
  
angular.module('flightApp',['ngRoute', 'ngSanitize', 'ui.bootstrap']);

config.$inject = ['$routeProvider', '$locationProvider'];
function config ($routeProvider, $locationProvider) {

  $routeProvider 
    .when('/', {
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
}

angular
  .module('flightApp')
  .config(['$routeProvider', '$locationProvider', config]);
})();