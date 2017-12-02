var User = require('../models/user');

var helper =  {
    
    getCategoryById: function(userId, categoryId, callback) {
        User.findOne({_id: userId, "categories._id": categoryId}, {"categories.$": 1}, function(err, doc){
            if(err) throw err;
            callback(err, doc.categories[0]);
        });
    }
}

module.exports = helper;