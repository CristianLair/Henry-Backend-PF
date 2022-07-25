
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ReviewSchema = new Schema({
  body: String,
  username: String,
  rating: Number,
}, {
  toJSON: {
    virtuals: true,
  },
});

module.exports = mongoose.model('Review', ReviewSchema);



