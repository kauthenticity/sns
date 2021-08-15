const mongoose = require('mongoose');

const {Schema} = mongoose;

const postSchema = new Schema({
  id : {
    type : String,
    ref : 'User',
    required : true,
  },
  content : {
    type : String,
  },
  img : {
    type : String,
  }
});

module.exports = mongoose.model('Post', postSchema);