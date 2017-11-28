var mongoose = require('mongoose');

module.exports = mongoose.model('Category', {
    name: {
        type: String,
        default: ''
    }
});
