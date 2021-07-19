const { User, Thought } = require('../models')

const CreateUser = async (req, res) => {
  try {
    let user = await User.create(req.body)
    let returnedUser = user
    returnedUser.friendCount = user.friendCount
    return res.status(201).json({
      message: 'user created',
      user: returnedUser,
    })
  } catch (err) {
    const { message } = err
    return res.status(500).json({
      message,
    })
  }
}

const FetchUsers = async (req, res) => {
  try {
    let users = await User.find({}).populate('friends')

    users = users.map((user) => user.toJSON({ virtuals: true }))
    return res.status(200).json({
      message: 'users fetched',
      users,
    })
  } catch (err) {
    const { message } = err
    return res.status(500).json({
      message,
    })
  }
}

const FetchUserById = async (req, res) => {
  try {
    const { userId } = req.params
    let user = await User.findById(userId).populate('friends')
    if (!user) {
      return res.status(404).json({
        message: 'user does not exist!',
      })
    }
    user = user.toJSON({ virtuals: true })
    return res.status(200).json({
      message: 'user fetched',
      user,
    })
  } catch (err) {
    const { message } = err
    return res.status(500).json({
      message,
    })
  }
}

const UpdateUser = async (req, res) => {
  try {
    const { userId } = req.params
    let user = await User.findByIdAndUpdate(userId, req.body, { new: true })
    if (!user)
      return res.status(404).json({
        message: 'user does not exist. cannot be updated!',
      })
    return res.status(200).json({
      message: 'user updated',
      user,
    })
  } catch (err) {
    const { message } = err
    return res.status(500).json({
      message,
    })
  }
}

const DeleteUser = async (req, res) => {
  try {
    const { userId } = req.params
    let user = await User.findByIdAndRemove(userId)
    if (!user)
      return res.status(404).json({
        message: 'user does not exist. cannot be deleted!',
      })
    //To delete all user assoiated thoughts after deleting user
    await Thought.deleteMany({ username: user._id })
    return res.status(200).json({
      message: 'user deleted',
      user,
    })
  } catch (err) {
    const { message } = err
    return res.status(500).json({
      message,
    })
  }
}

const AddFriendToUser = async (req, res) => {
  try {
    const { userId, friendId } = req.params
    const user = await User.findById(userId)
    const friend = await User.findById(friendId)
    friend.friends.push(userId)
    user.friends.push(friendId)
    await user.save()
    await friend.save()
    return res.status(200).json({
      message: 'friend added',
      user,
    })
  } catch (err) {
    const { message } = err
    return res.status(500).json({
      message,
    })
  }
}

const RemoveFriendFromUser = async (req, res) => {
  try {
    const { userId, friendId } = req.params
    const user = await User.findById(userId)
    const friend = await User.findById(friendId)
    const filteredFriends = user.friends.filter(
      (friend) => friend._id != friendId
    )
    const friendFilteredFriends = friend.friends.filter(
      (friend) => friend._id != userId
    )
    friend.friends = friendFilteredFriends
    user.friends = filteredFriends
    await user.save()
    await friend.save()
    return res.status(200).json({
      message: 'friend removed',
      user,
    })
  } catch (err) {
    const { message } = err
    return res.status(500).json({
      message,
    })
  }
}

module.exports = {
  DeleteUser,
  CreateUser,
  FetchUsers,
  FetchUserById,
  UpdateUser,
  AddFriendToUser,
  RemoveFriendFromUser,
}
