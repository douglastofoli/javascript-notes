const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
});

userSchema.pre('save', function (next) {
  console.log('teste');
  if (this.isNew || this.isModified('password')) {
    bcryptjs.hash(this.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      } else {
        this.password = hashedPassword;
        next();
      }
    });
  }
});

userSchema.methods.isCorrectPassword = function (password, callback) {
  bcryptjs.compare(password, this.password, function (err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
}

module.exports = mongoose.model('User', userSchema);