const { User, Thought } = require('../models')

const CreateThought = async (req, res) => {
  try {
    let { userId } = req.body
    if (!userId)
      return res.status(400).json({
        message: 'userId is required',
      })
    let user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: 'user does not exist' })
    let thought = await Thought.create(req.body)
    thought = thought.toJSON({ virtuals: true })
    user.thoughts.push(thought._id)
    await user.save()
    return res.status(201).json({
      message: 'thought created',
      thought,
    })
  } catch (err) {
    const { message } = err
    return res.status(500).json({
      message,
    })
  }
}

const FetchThoughts = async (req, res) => {
  try {
    let thoughts = await Thought.find({})
    return res.status(200).json({
      message: 'thoughts fetched',
      thoughts,
    })
  } catch (err) {
    const { message } = err
    return res.status(500).json({
      message,
    })
  }
}

const FetchThoughtById = async (req, res) => {
  try {
    const { thoughtId } = req.params
    let thought = await Thought.findById(thoughtId)
    if (!thought)
      return res.status(404).json({
        message: 'thought does not exist!',
      })
    return res.status(200).json({
      message: 'thought fetched',
      thought,
    })
  } catch (err) {
    const { message } = err
    return res.status(500).json({
      message,
    })
  }
}

const UpdateThought = async (req, res) => {
  try {
    const { thoughtId } = req.params
    let thought = await Thought.findByIdAndUpdate(thoughtId, req.body, {
      new: true,
    })
    if (!thought)
      return res.status(404).json({
        message: 'thought does not exist. cannot be updated!',
      })
    return res.status(200).json({
      message: 'thought updated',
      thought,
    })
  } catch (err) {
    const { message } = err
    return res.status(500).json({
      message,
    })
  }
}

const DeleteThought = async (req, res) => {
  try {
    const { thoughtId } = req.params
    let thought = await Thought.findByIdAndRemove(thoughtId)
    if (!thought)
      return res.status(404).json({
        message: 'thought does not exist. cannot be deleted!',
      })
    return res.status(200).json({
      message: 'thought deleted',
    })
  } catch (err) {
    const { message } = err
    return res.status(500).json({
      message,
    })
  }
}

const AddReactionToThought = async (req, res) => {
  try {
    const { thoughtId } = req.params
    const thought = await Thought.findById(thoughtId)
    thought.reactions.push(req.body)
    await thought.save()
    return res.status(200).json({
      message: 'reaction added',
      thought,
    })
  } catch (err) {
    const { message } = err
    return res.status(500).json({
      message,
    })
  }
}

const RemoveReactionFromThought = async (req, res) => {
  try {
    const { thoughtId, reactionId } = req.params
    const thought = await Thought.findById(thoughtId)
    const filteredReaction = thought.reactions.filter(
      (reaction) => reaction._id.toString() != reactionId
    )
    thought.reactions = filteredReaction
    await thought.save()
    return res.status(200).json({
      message: 'reaction removed',
      thought,
    })
  } catch (err) {
    const { message } = err
    return res.status(500).json({
      message,
    })
  }
}

module.exports = {
  AddReactionToThought,
  RemoveReactionFromThought,
  CreateThought,
  FetchThoughts,
  FetchThoughtById,
  UpdateThought,
  DeleteThought,
}
