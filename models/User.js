const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String
  },
  oauthId: {
    type: String,
    default: null
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.virtual('password').set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, 12);
});

module.exports = mongoose.model('users', UserSchema);
