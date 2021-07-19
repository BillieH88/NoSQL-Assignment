const express = require('express')
const router = express.Router()
const { ThoughtControllers } = require('../controllers')

router
  .route('/')
  .get(ThoughtControllers.FetchThoughts)
  .post(ThoughtControllers.CreateThought)

router
  .route('/:thoughtId')
  .get(ThoughtControllers.FetchThoughtById)
  .put(ThoughtControllers.UpdateThought)
  .delete(ThoughtControllers.DeleteThought)

router
  .route('/:thoughtId/reactions')
  .post(ThoughtControllers.AddReactionToThought)

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(ThoughtControllers.RemoveReactionFromThought)

module.exports = { router }
