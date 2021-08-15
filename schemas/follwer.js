const mongoose = require('mongoose');

const {Schema} = mongoose;

const followerSchema = new Schema({
  followerId : {
    type : [ObjectId],    
  }
});

module.exports = mongoose.model('Follower', followerSchema);