var express = require('express');
var http = require('http');
var path = require('path');
var UglifyJS = require('uglify-js');
var fs = require('fs');
var app = express();
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var token = jwt.sign({
  user : 'psloss', 
  password : 'lowsec15'
}, 'secret');
console.log(token);

//Login routes, success delivers angular SPA
/*app.get('/', function (req, res) {
  res.render('index.jade', {
    title : "n562d", 
    strapline : "Please Log In"
  })
});

app.get('/login', function (req, res) {
  res.redirect('/#/home')
});*/



jwt.verify(token, 'secret', function(err, decoded) {
  if (err) {
    console.log(err);
  }
  console.log(decoded);
  return 0;
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/app_server/views'));
app.set('view engine', 'jade');

//time to MINIFY!
var appClientFiles = [
  'app_client/app.js',
  //Controllers
  'app_client/home/home.controller.js',
  'app_client/logs/logs.controller.js',
  'app_client/modals/updateModalCtrl.js',
  'app_client/modals/addModalCtrl.js',
  'app_client/login/loginCtrl.js',

  //Services
  'app_client/common/services/flightData.service.js', 
  //Filters
  'app_client/common/filters/formatDistance.filter.js',
  'app_client/common/filters/addHtmlLineBreaks.filter.js',
  //Directives
  'app_client/common/directives/navigation/navigation.directive.js',
  'app_client/common/directives/footerGeneric/footerGeneric.directive.js',
  'app_client/common/directives/pageHeader/pageHeader.directive.js'
];

//MINIFY scripts.
var uglified = UglifyJS.minify(appClientFiles, { compress : false });

fs.writeFile('public/angular/n562d.min.js', uglified.code, function (err){
  if(err) { 
    console.log(err); 
  } else { 
    console.log('Script generated and saved: n562d.min.js'); 
  } 
});

app.use(express.favicon());
app.use(express.logger('dev'));
//app.use('/', expressJwt({ secret : 'secret' }));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
// app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//require('./routes')(app);
require('./app_api/routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});