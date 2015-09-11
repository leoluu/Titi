var List = require('../models/List');
module.exports = function (server) {
    var validateRequest = require("../auth/validateRequest");

    server.get("/api/v1/bucketList/data/list", function (req, res, next) {
        validateRequest.validate(req, res, function () {
            List.find({
                user : req.params.token
            },function (err, list) {
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(list));
            });
        });
        return next();
    });

    server.get('/api/v1/bucketList/data/item/:id', function (req, res, next) {
        validateRequest.validate(req, res, function () {
            List.find({
                _id: req.params.id
            }, function (err, data) {
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(data));
            });
        });
        return next();
    });

    server.post('/api/v1/bucketList/data/item', function (req, res, next) {
        validateRequest.validate(req, res, function () {
            var item = req.params;
            var instance = new List(item);
            instance.save(
                function (err, data) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json; charset=utf-8'
                    });
                    res.end(JSON.stringify(data));
                });
        });
        return next();
    });

    server.put('/api/v1/bucketList/data/item/:id', function (req, res, next) {
        validateRequest.validate(req, res, function () {
                        List.findOne({
                _id: req.params.id
            }, function (err, data) {
                // merge req.params/product with the server/product


                // logic similar to jQuery.extend(); to merge 2 objects.
             /*                for (var n in data) {
                    updProd[n] = data[n];
                }*/
                //var updProd = {}; // updated products
                for (var n in req.params) {
                    if (n != "id") {
                        data[n] = req.params[n];
                    }
                }

                data.save(
                    function (err, data) {
                    if (err) { // duplicate key error
                        console.log(err, "update err");
                        /*if (err.code == 11000)  http://www.mongodb.org/about/contributors/error-codes/*/ {
                            res.writeHead(400, {
                                'Content-Type': 'application/json; charset=utf-8'
                            });
                            res.end(JSON.stringify({
                                error: err,
                                message: err
                            }));
                        }
                    } else {
                        res.writeHead(200, {
                            'Content-Type': 'application/json; charset=utf-8'
                        });
                        res.end(JSON.stringify(data));
                    }
                });
            });
        });
        return next();
    });

    server.del('/api/v1/bucketList/data/item/:id', function (req, res, next) {
        validateRequest.validate(req, res, function () {
            List.remove({
                _id: req.params.id
            }, function (err, data) {
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(data));
            });
            return next();
        });
    });

}