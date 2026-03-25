const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  favorites: [
    {
      id: Number,
      title: String,
      image: String
    }
  ]
})

module.exports = mongoose.model("User", UserSchema)