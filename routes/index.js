/* GET home page. */
var ctrl = require('../app_server/controllers/main');

module.exports = function(app){
//home page + controller since its only one line
    app.get('/', function(req, res) {
    res.render('index', { title: 'Express' })});
    
    app.get('/loglist', ctrl.renderLoglist);
    app.get('/logadd', ctrl.renderLogAdd);
    app.get('/', ctrl.renderHome);
    app.get('/logdelete/:id', ctrl.renderLogDelete);
};