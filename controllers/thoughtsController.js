const { Thoughts, User } = require('../Models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThoughts(req, res) {
    try {
      const thoughts = await Thoughts.findOne({ _id: req.params.postId });

      if (!thoughts) {
        return res.status(404).json({ message: 'No thoughts with that ID' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  // create a new post
  async createThoughts(req, res) {
    try {
      const thoughts = await Thoughts.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { posts: post._id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought created, but found no user with that ID' });
      }

      res.json('Created the Thought 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
