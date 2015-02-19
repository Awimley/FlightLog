//the 'airborn API' for n562d tracking application 
var api = require('../controllers/main');

//API ROUTES
module.exports = function(app){
    //CREATE=========================================================
    app.post('/logadd', api.addFlight);
    //UPDATE=========================================================
    app.put('/logupdate/:id', api.updateFlight);
    //READ===========================================================
    app.get('/loglist', api.getLogs);    
    app.get('/findone/:id', api.findOne);
    //DELETE=========================================================
    app.get('/logupdate/delete/:id', api.deleteFlight);
};