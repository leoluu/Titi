var pwdMgr = require('./managePasswords');
var User     = require('../models/User');
module.exports = function (server) {
    // unique index
/*    db.appUsers.ensureIndex({
        email: 1
    }, {
        unique: true
    })*/

    server.post('/api/v1/bucketList/auth/register', function (req, res, next) {
        var user = req.params;
        console.log(req.params, "signup");
        console.log(user.password, "signup user.password");
        pwdMgr.cryptPassword(user.password, function (err, hash) {
            console.log(hash, "signup hash");
            user.password = hash;
            var instance = new User(user);
/*            instance.name =user.name;
            instance.password = user.password;
            instance.email = user.email;*/
            instance.save(
                function (err, dbUser) {
                    if (err) { // duplicate key error
                        console.log(err, "signup hash err");
                        console.log(err.value, "signup hash err.value");
                        console.log(err.user, "signup hash err dbUser");
                        /*if (err.code == 11000)  http://www.mongodb.org/about/contributors/error-codes/*/ {
                            res.writeHead(400, {
                                'Content-Type': 'application/json; charset=utf-8'
                            });
                            res.end(JSON.stringify({
                                error: err,
                                message: err.errors.email.message
                            }));
                        }
                    } else {
                        res.writeHead(200, {
                            'Content-Type': 'application/json; charset=utf-8'
                        });
                        console.log(dbUser, "signup hash dbUser");
                        dbUser.password = "";
                        res.end(JSON.stringify(dbUser));
                    }
                });
        });
        return next();
    });

    server.post('/api/v1/bucketList/auth/login', function (req, res, next) {
        var user = req.params;
        console.log(req.params, "signin");
        if (user.email.trim().length == 0 || user.password.trim().length == 0) {
            res.writeHead(403, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            console.log("signin error");
            res.end(JSON.stringify({
                error: "Invalid Credentials"
            }));
        }
        console.log("signin in");
        User.findOne({
            email: req.params.email
        }, function (err, dbUser) {

            console.log(dbUser, "signin in dbUser");
            console.log(dbUser.password, "signin in dbUser.password");
            pwdMgr.comparePassword(user.password, dbUser.password, function (err, isPasswordMatch) {

                if (isPasswordMatch) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json; charset=utf-8'
                    });
                    // remove password hash before sending to the client
                    dbUser.password = "";
                    res.end(JSON.stringify(dbUser));
                } else {
                    res.writeHead(403, {
                        'Content-Type': 'application/json; charset=utf-8'
                    });
                    res.end(JSON.stringify({
                        error: "Invalid User"
                    }));
                }

            });
        });
        return next();
    });
};