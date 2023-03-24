const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "fullName is required"],
    unique: [true, "fullName already exists."],
    validate: [
      (name) => validator.isAlpha(name, "en-US", { ignore: " " }),
      "Usernames must be alphanumeric",
    ],
  },
  email: {
    type: String,
    required: [true, "email address is required."],
    unique: [true, "That email address is already exists."],
    lowercase: true,
    validate: [validator.isEmail, "enter a valid email."],
  },
  password: {
    type: String,
    required: [true, "password is required."],
    validate: [
      (pass) => {
        let min = pass.length >= 8;
        let upper = /[A-Z]/.test(pass);
        let lower = /[a-z]/.test(pass);
        let special = /[#?!@$%^&*-]/.test(pass);
        let number = /[0-9]/.test(pass);

        return min && lower && upper && special && number;
      },
      "Password should have min. eight characters, at least one uppercase letter and lowercase letter & one digit, & one special character",
    ],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 12);
  next();
});

module.exports = mongoose.model("Users", UserSchema);
