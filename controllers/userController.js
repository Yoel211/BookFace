const User = require('../Models/User');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  // PUT to update a user by id
  async updateUser (req , res){
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
    }
  },
  // Delete to remove user by id
  async deleteUser (req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  async addFriend (req, res) {
    try {
      const dbUserData = User.findOneAndUpdate(
        { _id: req.params.userId},
        {$addtoset: {friends: req.params.friendId}},
        { new: true}
      )
      if (!dbUserData) {
        res.status(404).json({message: 'No user with that ID'});
      }
      res.jon(dbUserData);
    }catch (err){
      res.status(500).json(err);
    }
  },
  async removeFriend (req, res) {
    try {
      const user = User.findOneAndUpdate(
        { _id: req.params.userId},
        {$pull: {friends: req.params.friendId}},
        {runValidators: true , new: true}
      )
      if (!user) {
        res.status(404).json({message: 'No user with that ID'});
      }
      res.jon(user);
    }catch (err){
      res.status(500).json(err);
    }
  }
};




