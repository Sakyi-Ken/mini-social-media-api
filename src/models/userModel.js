const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true, 
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  phone_number: {
    type: String,
  },
  date_of_birth: {
    type: Date
  },
},{ timestamps: true });

module.exports = mongoose.model('User', userSchema);