const router = require('express').Router();
const userRoutes = require('./userRoutes');
// http://localhost:3001/api/users
const thoughtRoutes = require('./thoughtRoutes')
router.use('/thoughts' , thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;