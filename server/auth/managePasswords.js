/** http://stackoverflow.com/a/14015883/1015046 **/
var bcrypt = require('bcrypt-nodejs');

module.exports.cryptPassword = function (password, callback) {
    console.log(password, "cryptPassword");
    bcrypt.genSalt(10, function (err, salt) {
        if (err){
            console.log(err, "cryptPassword error");
            return callback(err);
        }



        bcrypt.hash(password, salt, function () {},  function (err, hash) {
            console.log(err,"cryptPassword error hash");
            return callback(err, hash);
        });

    });
};

module.exports.comparePassword = function (password, userPassword, callback) {
    bcrypt.compare(password, userPassword, function (err, isPasswordMatch) {
        if (err){
            console.log(err, "comparePassword error");
            return callback(err);
        }
        console.log(isPasswordMatch, "comparePassword isPasswordMatch error");
        return callback(null, isPasswordMatch);
    });
};