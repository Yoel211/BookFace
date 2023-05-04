const router = require('express').Router();
const {
  getSingleThoughts,
  getThoughts,
  createThoughts,
  deleteThoughts,
  updateThoughts,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts).post(createThoughts);

router.route('/:thoughtId').get(getSingleThoughts);
router.route('/:thoughtId').delete(deleteThoughts);
router.route('/:thoughtId').put(updateThoughts);

router.route('/:thoughtId/reactions').post(createReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
module.exports = router;