/**
 * Created by Administrator on 2015/8/29.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validateUniqueEmail = function(value, callback){
    var User = mongoose.model('User');
    User.find({
        $and: [{
            email: value
        }, {
            _id: {
                $ne: this._id
            }
        }]
    }, function(err, user) {
        callback(err || user.length === 0);
    });
};

var UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
        validate: [validateUniqueEmail, 'E-mail address is already in-use']
    },
    roles: {
        type: Array,
        default: ['authenticated']
    },
    password: String
    //token: String
});

module.exports = mongoose.model('User', UserSchema);