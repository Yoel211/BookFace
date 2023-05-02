const { Schema, model } = require('mongoose');

// Schema to create User model

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought'
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  toJSON: {
    virtuals: true
  }
});

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});




  
// Initialize our User model
const User = model('user', userSchema);

module.exports = User;