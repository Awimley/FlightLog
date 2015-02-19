(function () {
  angular
    .module('loc8rApp')
    .controller('aboutCtrl', aboutCtrl);

  aboutCtrl.$inject = ['$modal', '$scope', 'flightData'];
  function aboutCtrl($modal, $scope, flightData) {

    var vm = this;
    var table;
    vm.pageHeader = {
      title: 'Logs',
      strapline: 'Date here?'
    };
    flightData.flightData()
    .success(function (data) {
      vm.data = {flights : data.reverse()};
    })
    .error(function (e) {
      console.log(e);
    });
    vm.popupReviewForm = function () {
      var modalInstance = $modal.open ({
        templateUrl : '/updateModal/updateModal.view.html',
        controller : 'updateModalCtrl as vm',
        resolve : {
          locationData : function () {
            return {
              locationName : 'some random name'
            };
          }
        }
      });
      modalInstance.result.then(function (data) {
        //
      });
    };
  }
})();