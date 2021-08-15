const mongoose = require('mongoose');

const {Schema} = mongoose;

const followingSchema = new Schema({
  followerId : {
    type : [ObjectId],    
  }
});

module.exports = mongoose.model('Following', followingSchema);