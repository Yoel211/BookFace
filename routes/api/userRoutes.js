const router = require('express').Router();
const {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController.js');
// http://localhost:3001/api/users/
router.route('/').get(getUsers).post(createUser);
// http://localhost:3001/api/users/12334
router.route('/:userId').get(getSingleUser);
// http://localhost:3001/api/users/12334
router.route('/:userId').put(updateUser);
// http://localhost:3001/api/users/12334
router.route('/:userId').delete(deleteUser);

module.exports = router;