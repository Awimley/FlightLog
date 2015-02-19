(function () {
  angular
    .module('flightApp')
    .service('flightData', flightData);

  flightData.$inject = [ '$http'];
  function flightData ( $http) {

    var undToZero = function(data) {
      data.hobbs_in = data.hobbs_in || 0;
      data.fuel_in = data.fuel_in || 0;
      data.fuel_purch = data.fuel_purch || 0;
      data.fuel_cost = data.fuel_cost || 0;
      data.oil_added = data.oil_added || 0;
      data.oil_dipstick = data.oil_dipstick || 0;
      data.comment = data.comment || 0;
      data.oil_change = data.oil_change || 0;
      return data;
    };

    var getData = function () {
      return $http.get('/loglist');
    };

    var findOne = function (id) {
      if (id) { return $http.get('/findone/' + id); }
      else { return null; }
    };

    var addFlight = function (data) {
      if (data) {
        //do the heavy lifting in services! (cast undefined to 0)
        data = undToZero(data);

        //then push the full object to mongodb
        return $http.post('/logadd', data);
      } else {
        return null;
      }
    };

    var updateFlight = function(data) {
      if (data) {
        data = undToZero(data);

        return $http.put('/logupdate/' + data._id, data);
      } else {
        return null;
      }      
    };

    var deleteFlight = function(id) {
      if (id) {
        return $http.get('/logupdate/delete/' + id);
      } else {
        return null;
      }
    };

    return {
      flightData : getData,
      flight : findOne,
      addFlight : addFlight,
      deleteFlight : deleteFlight,
      updateFlight : updateFlight
    };
  }
})();