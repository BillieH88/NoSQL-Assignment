const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema

const ReactionSchema = new Schema({
  reactionId: ObjectId,
  reactionBody: {
    type: String,
    required: true,
    max: [280, 'maximum of 280 characters'],
  },
  username: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    min: [1, 'minimum of one character'],
    max: [280, 'maximum of 280 character'],
    trim: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reactions: [ReactionSchema],
})

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length
})

//virtual reactionCount retrieves lenth of thoughts reactions on querying for thoughts

const Thought = mongoose.model('Thought', ThoughtSchema)

module.exports = Thought
