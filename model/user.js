const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


// Define the user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // Username (required)
      unique: true, // Ensure username is unique},
    },
      password: {
      type: String,
      required: true, // user content (required)
    },
    name: {
      type: String,
      required: true, // Author name (required)
    },
    friends: {
      type: [String], // Array of usernames for friends
      default: [], // Default to an empty array
    },
  }
); // Explicitly specify the collection name



// Hash password be fore saving
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model("User", userSchema);