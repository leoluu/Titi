var restify     =   require('restify');
var mongojs     =   require('mongojs');
var	morgan  	= 	require('morgan');
var mongoose   = require("mongoose");
//var db          =   mongojs('bucketlistapp', ['appUsers','bucketLists']);
var server      =   restify.createServer();



// Connect to DB
mongoose.connect('mongodb://localhost:27017/bucketlistapp');

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(morgan('dev')); // LOGGER

// CORS
server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

server.listen(process.env.PORT || 9804, function () {
    console.log("Server started @ ", process.env.PORT || 9804);
});

var manageUsers =   require('./auth/manageUser')(server);
var manageLists =   require('./list/manageList')(server);