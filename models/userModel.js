const validator = require("validator");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSChema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String || Number,
    required: true,
  },
});

userSChema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields are required");
  }
  if (!validator.isEmail(email)) {
    throw Error("Emails is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      `Password is not strong Enough Please use, capital letter, number and a symbol (e.g: !, ?, %)`
    );
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

userSChema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields are required");
  }
  
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, user.password);
  if(!match) {
    throw Error('Incorrect Password');
  }
  return user;
};

module.exports = mongoose.model("User", userSChema);
