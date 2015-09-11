var User     = require('../models/User');
var isEmailValid = function (email, callback) {
    User.findOne({
        email: email
    }, function (err, user) {
        callback(user);
    });
};

module.exports.validate = function (req, res, callback) {
    // if the request dosent have a  header with email, reject the request
    if (!req.params.token) {
        res.writeHead(403, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify({
            error: "You are not authorized to access this application",
            message: "An Email is required as part of the header"
        }));
    };


   isEmailValid(req.params.token, function (user) {
        if (!user) {
            res.writeHead(403, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify({
                error: "You are not authorized to access this application",
                message: "Invalid User Email"
            }));
        } else {
            callback();
        }
    });
};