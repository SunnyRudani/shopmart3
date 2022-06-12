"use strict";
var mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const { string } = require("joi");
const SALT_WORK_FACTOR = 10;
var userSchema = new mongoose.Schema(
    {
      userName:{
        type: String,
            required: true,
            trim: true,
      },
mobile:{
    type: Number,
            required: true,
            unique: true,
            trim: true,

},
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        confirmPassword: {
          type: String,
          // required: true,
          trim: true,
      },
        isActive: {
            type: Boolean,
            default: false,
        },
        forgetPasswordOtp: {
            type: Number,
        },
        forgetPasswordOtpExpireTime: {
            type: Date,
        },
        accountActivationCode: {
          type: String,
      },
        createdBy: {
            type: String,
            default: false,
        },

    },
    {
        timestamps: true,
    }
);
userSchema.index({ email: 1 });

userSchema.pre("save", function (next) {
  var User = this;
  if (!User.isModified("password")) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(User.password, salt, function (err, hash) {
      if (err) return next(err);
      User.password = hash;
      next();
    });
  });
});

userSchema.pre("findOneAndUpdate", function (next) {
  const User = this.getUpdate().$set;
  if (!User.password) {
    next();
  } else {
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(User.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        User.password = hash;
        next();
      });
    });
  }
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
var user = mongoose.model("users", userSchema);
module.exports = user;
