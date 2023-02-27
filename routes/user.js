const express = require('express');

const router = express.Router();
const {singupUser, loginUser} = require('../controllers/userController');

// log in route
router.post('/login', loginUser);

// sign up route

router.post('/signup', singupUser);

module.exports = router;