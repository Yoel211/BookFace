const router = require('express').Router();
const {
  getSingleThoughts,
  getThoughts,
  createThoughts,
} = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts).post(createThoughts);

router.route('/:thoughtId').get(getSingleThoughts);

module.exports = router;