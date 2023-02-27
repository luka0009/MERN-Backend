const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
require('dotenv').config();

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'});
};

// user login
const loginUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.login(email, password);

    // creating a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// user sign up
const singupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // creating a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

module.exports = { singupUser, loginUser };
