const { Thought, User } = require('../Models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThoughts(req, res) {
    try {
      const thoughts = await Thought.findOne({ _id: req.params.postId });

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
      const thoughts = await Thought.create(req.body);
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
  async updateThoughts (res, req) {
    try {
      const { thoughtText } = req.body;
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.id,
        { thoughtText },
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update thought' });
    }
  },
  async deleteThought (res, req) {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.id);
      if (!deletedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      await User.findByIdAndUpdate(deletedThought.user, { $pull: { thoughts: deletedThought._id } });
      res.json(deletedThought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete thought' });
    }
  }
};


// PUT to update a thought by its _id
// router.put('/:id', async (req, res) => {
//   try {
//     const { thoughtText } = req.body;
//     const updatedThought = await Thought.findByIdAndUpdate(
//       req.params.id,
//       { thoughtText },
//       { new: true }
//     );
//     if (!updatedThought) {
//       return res.status(404).json({ error: 'Thought not found' });
//     }
//     res.json(updatedThought);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to update thought' });
//   }
// });

// DELETE to remove a thought by its _id
// router.delete('/:id', async (req, res) => {
//   try {
//     const deletedThought = await Thought.findByIdAndDelete(req.params.id);
//     if (!deletedThought) {
//       return res.status(404).json({ error: 'Thought not found' });
//     }
//     await User.findByIdAndUpdate(deletedThought.username, { $pull: { thoughts: deletedThought._id } });
//     res.json(deletedThought);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to delete thought' });
//   }
// });

// POST a new reaction to a thought
// router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
//   try {
//     const { reactionBody, username } = req.body;
//     const thought = await Thought.findById(req.params.thoughtId);
//     if (!thought) {
//       return res.status(404).json({ message: 'Thought not found' });
//     }
//     const reaction = {
//       reactionBody,
//       username,
//       createdAt: new Date()
//     };
//     thought.reactions.push(reaction);
//     await thought.save();
//     res.status(200).json(thought);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// // DELETE a reaction from a thought
// router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
//   try {
//     const thought = await Thought.findById(req.params.thoughtId);
//     if (!thought) {
//       return res.status(404).json({ message: 'Thought not found' });
//     }
//     const reaction = thought.reactions.id(req.params.reactionId);
//     if (!reaction) {
//       return res.status(404).json({ message: 'Reaction not found' });
//     }
//     reaction.remove();
//     await thought.save();
//     res.status(200).json(thought);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });
