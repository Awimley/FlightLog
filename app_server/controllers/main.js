var express = require('express');
var db = require('../models/db');
var Flight = require('../models/flight');


/* - for flt in flights
            - hobbsIn = flt.hobbs_out.toFixed(1);
            - hobbsOut = flt.hobbs_in.toFixed(1);
            - fuelUsed = (flt.fuel_out - flt.fuel_in + flt.fuel_purch).toFixed(1);
            - hoursFlown = (flt.hobbs_in - flt.hobbs_out).toFixed(1);
            - fuelHour = (fuelUsed / hoursFlown).toFixed(1);
            - fltDate = flt.flt_date.substring(0,10);
            - fuelIn = flt.fuel_in.toFixed(1);
            - if(flt.oil_change == 1){lastOilChange = flt.hobbs_out};
            - hoursLastOilChange = (flt.hobbs_in - lastOilChange).toFixed(1); */

module.exports.renderLoglist = function(req, res) {
  var flt, hobbsIn, hobbsOut, fuelUsed, hoursFlown, fuelHour, fltDate, fuelIn, lastOilChange, hoursLastOilChange;  
  //render the log page
  Flight.find( {} , function (err, docs) {//find data
  console.log('calling loglist');
  res.render( 
      'loglist', {title:'Airplane Data Tracking System'
          , flights:docs });//.reverse()});
  });
};

//render the add page
module.exports.renderLogAdd = function (req, res) {
  console.log('rendering logadd');
  res.render('logadd', {} );
};

//render the delete page
module.exports.renderLogDelete = function (req, res) {
  res.render('logdelete', {} );
};

//render home
module.exports.renderHome = function (req, res) {
  res.render('/', {} );
};