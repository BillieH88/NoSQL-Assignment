const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema

const UserSchema = new Schema({
  username: { type: String, unique: true, trim: true, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  },
  thoughts: [{ type: ObjectId, ref: 'Thought' }],
  friends: [{ type: ObjectId, ref: 'User' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

UserSchema.virtual('friendCount').get(function () {
  return this.friends.length
})

const User = mongoose.model('User', UserSchema)

module.exports = User
