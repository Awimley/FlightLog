(function () {
  angular
    .module('flightApp')
    .controller('logsCtrl', logsCtrl);

  logsCtrl.$inject = ['$routeParams', '$modal', '$scope', 'flightData', '$log'];
  function logsCtrl($routeParams, $modal, $scope, flightData, $log) {

    var vm = this;

    //Date stuff
    var date = new Date();
    date = date.toISOString();
    date = date.slice(5,7) + '/' + date.slice(8,10) + '/' + date.slice(2,4);

    vm.pageHeader = {
      title: 'Logs',
      strapline: date
    };

    flightData.flightData()
    .success(function (data) {
      vm.data = {flights : data.reverse()};
    })
    .error(function (e) {
      console.log(e);
    });

    vm.popupUpdateForm = function ($event) {
      var id = $event.currentTarget.attributes['id'].value;
      flightData.flight(id).success(function (data) {
        $log.debug(data);
        var modalInstance = $modal.open ({
          templateUrl : '/modals/updateModal.view.html',
          controller : 'updateModalCtrl as vm',
          resolve : {
            flight : function () {
              return {
                flight : data
              };
            }
          }
        });
        modalInstance.result.then(function (data) {
          flightData.flightData()
          .success(function (data) {
            vm.data = {flights : data.reverse()};
          })
          .error(function (e) {
            $log.debug(e);
          });
        });
      })
      .error(function(err) {
        $log.debug(err);
      })
    };

    //Add form from navigation directive
    vm.popupAddForm = function () {
      var modalInstance = $modal.open ({
        templateUrl : '/modals/addModal.view.html',
        controller : 'addModalCtrl as vm',
        resolve : {
          flight : function () {
            return {
              flt_date : date,
              hobbs_out : vm.data.flights[0].hobbsIn
            };
          }
        }
      });
      modalInstance.result.then(function () {
        flightData.flightData()
        .success(function (data) {
          vm.data = {flights : data.reverse()};
        })
        .error(function (e) {
          $log.debug(e);
        });
      });
    };

  }
})();