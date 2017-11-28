var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var CategorySchema = new Schema({
  users_id: {
        type: String,
        required: true
  },
  categoryName: {
      type: String,
      unique: true,
      required: true
  }
});

CategorySchema.pre('save', function (next) {
    var category = this;
    return next();
});

mongoose.model('Category', CategorySchema);
