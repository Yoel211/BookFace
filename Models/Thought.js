const { Schema, model } = require('mongoose');

// Schema to create Thought model
const Thought = require('mongoose');


const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
}, {
  toJSON: {
    virtuals: true,
    getters: true
  }
});

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// Schema to create reaction field's subdocument schema in the Thought model.

const reactionSchema = new Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
  }
});

const dateFormat = timestamp => {
  return new Date(timestamp).toISOString();
};

module.exports = reactionSchema;


// Initialize our Thoughts model
const Thought = model('thoughts', thoughtsSchema);
module.exports = Thought;
