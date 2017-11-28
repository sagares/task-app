var mongoose = require('mongoose');

module.exports = mongoose.model('Task', {
    task: {
        type: String,
        default: ''
    },
    category: {
      type: String,
      default: ''
    }
});
