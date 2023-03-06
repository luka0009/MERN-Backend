const express = require('express');

const router = express.Router();
const {singupUser, loginUser} = require('../controllers/userController');

router.post('/login', loginUser);

router.post('/signup', singupUser);

module.exports = router;