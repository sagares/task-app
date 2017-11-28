var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    task: {
        type: String,
        default: ''
    },
    category: {
      type: String,
      default: ''
    }
});
