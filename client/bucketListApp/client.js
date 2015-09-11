// Required Modules
var express    = require("express");
var path = require('path');
var morgan     = require("morgan");
var app        = express();

var port = process.env.PORT || 3001;

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, './www')));

app.get("/", function(req, res) {
    res.sendFile("./www/index.html");
});

// Start Server
app.listen(port, function () {
    console.log( "Express server listening on port " + port);
});