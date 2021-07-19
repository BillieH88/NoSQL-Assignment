const express = require('express')
const { UserControllers } = require('../controllers')
const router = express.Router()

router
  .route('/')
  .get(UserControllers.FetchUsers)
  .post(UserControllers.CreateUser)

router
  .route('/:userId')
  .get(UserControllers.FetchUserById)
  .put(UserControllers.UpdateUser)
  .delete(UserControllers.DeleteUser)

router
  .route('/:userId/friends/:friendId')
  .post(UserControllers.AddFriendToUser)
  .delete(UserControllers.RemoveFriendFromUser)

module.exports = { router }
