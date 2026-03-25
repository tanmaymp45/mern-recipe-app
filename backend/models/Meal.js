const mongoose = require("mongoose")

const MealSchema = new mongoose.Schema({
  userId: String,
  day: String,
  recipeId: Number,   
  title: String,      
  image: String,      
  mealName: String,   
  note: String        
})

module.exports = mongoose.model("Meal", MealSchema)