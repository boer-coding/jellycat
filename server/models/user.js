const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String, // Passport-local-mongoose will handle password hashing
  },
  username: { type: String },
  cart: [
    {
      id: String,
      img: String,
      title: String,
      price: Number,
      size: String,
      count: Number,
      cost: Number,
    },
  ],
});

// Plugin passport-local-mongoose for authentication methods
UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const User = mongoose.model("User", UserSchema);

module.exports = User;
