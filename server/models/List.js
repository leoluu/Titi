/**
 * Created by Administrator on 2015/8/30.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ListSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    item: {
        type: String
    },
    isCompleted: {
        type: Boolean
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date
    }
});

module.exports = mongoose.model('List', ListSchema);