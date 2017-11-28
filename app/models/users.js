var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    userName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    }
});
