const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [String],
  instructions: String,
  image: String
})

module.exports = mongoose.model("Recipe", recipeSchema)