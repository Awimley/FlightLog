(function () {
  
  angular
    .module('flightApp')
    .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location', '$scope']
  function loginCtrl($location, $scope) {
    var vm = this;
    vm.pageHeader = {
      title : 'N562D App',
      strapline: 'Have a nice flight!'
    };

    vm.login = function (){
      //do login through data service, compare JWTs
    };
  }
})();
