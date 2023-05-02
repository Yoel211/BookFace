const router = require('express').Router();
const {
  getSingleThoughts,
  getThoughts,
  createThoughts,
  deleteThoughts,
  updateThoughts,
} = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts).post(createThoughts);

router.route('/:thoughtId').get(getSingleThoughts);
router.route('/:thoughtId').delete(deleteThoughts);
router.route('/:thoughtId').put(updateThoughts);
module.exports = router;