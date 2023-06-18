const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  UserID: {
    type: Number,
    required: [true, 'UserID Tidak Boleh Kosong'],
  },
  CompanyID: {
    type: Number,
    min: 1,
    required: [true, 'CompanyID Tidak Boleh Kosong'],
  },
  Name: {
    type: String,
    required: [true, 'Name Tidak Boleh Kosong'],
  },
  Email: {
    type: String,
    required: [true, 'Email Tidak Boleh Kosong'],
  },
  Username: {
    type: String,
    required: [true, 'Username Tidak Boleh Kosong'],
  },
  Password: {
    type: String,
    required: [true, 'Password Tidak Boleh Kosong'],
  },
  Image: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;