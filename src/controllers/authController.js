const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken'); 
const User = require('../models/userModel');

// user sign up
exports.signUp = async (req, res) => {
  try{
    const { first_name, last_name, username, email, password, phone_number, date_of_birth } = req.body;
    // validation
    if (!first_name || !last_name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }
    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists", success: false });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create new user
    const newUser = new User({
      first_name,
      last_name,
      username,
      email,
      password: hashedPassword,
      phone_number,
      date_of_birth,
    })
    // save user to database
    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created successfully", success: true, user: savedUser });
  } catch (error) {
    console.error("Error in signing up: ", error.message);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
}

