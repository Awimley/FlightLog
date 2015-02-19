(function () {
  
  angular
    .module('flightApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$modal', '$scope', 'flightData', '$log'];
  function homeCtrl ($modal, $scope, flightData, $log) {
    var vm = this;
    vm.pageHeader = {
      title : 'N562D App (angular edition!)',
      strapline: 'Have a nice flight!'
    };
    //API calls are cool
   flightData.flightData()
    .success(function (data) {
      vm.data = {flight : data[data.length -1]};
      $log.debug(vm.data.flight)
    })
    .error(function (e) {
      console.log(e);
    });
    //MODAL

    var date = new Date();
    date = date.toISOString();
    date = date.slice(5,7) + '/' + date.slice(8,10) + '/' + date.slice(2,4);

    vm.popupAddForm = function () {
      var modalInstance = $modal.open ({
        templateUrl : '/modals/addModal.view.html',
        controller : 'addModalCtrl as vm',
        resolve : {
          flight : function () {
            return {
              flt_date : date,
              hobbs_out : vm.data.flight.hobbsIn
            };
          }
        }
      });
      modalInstance.result.then(function (data) {
        flightData.flightData()
        .success(function (data) {
          vm.data = {flight : data[data.length -1]};
        })
        .error(function (e) {
          console.log(e);
        });
      });
    };
  }
})();

