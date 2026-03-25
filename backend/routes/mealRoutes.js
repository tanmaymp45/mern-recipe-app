const router = require("express").Router()
const Meal = require("../models/Meal")


router.post("/", async (req, res) => {
  try {

    const { userId, day, recipeId, title, image, mealName, note } = req.body

    if (!userId || !day || (!recipeId && !mealName)) {
      return res.status(400).json({ message: "userId, day and (recipeId or mealName) are required" })
    }

    const existingMeal = await Meal.findOne({ userId, day })

    if (existingMeal) {
      existingMeal.recipeId = recipeId || existingMeal.recipeId
      existingMeal.title = title || existingMeal.title
      existingMeal.image = image || existingMeal.image
      existingMeal.mealName = mealName || existingMeal.mealName
      existingMeal.note = note !== undefined ? note : existingMeal.note
      await existingMeal.save()
      return res.json(existingMeal)
    }

    const meal = new Meal({
      userId,
      day,
      recipeId,
      title,
      image,
      mealName,
      note
    })

    await meal.save()

    res.json(meal)

  } catch (err) {
    res.status(500).json(err)
  }
})


router.get("/:userId", async (req, res) => {
  try {

    const meals = await Meal.find({ userId: req.params.userId })

    res.json(meals)

  } catch (err) {
    res.status(500).json(err)
  }
})


router.delete("/:userId/:day", async (req, res) => {
  try {
    const { userId, day } = req.params
    await Meal.findOneAndDelete({ userId, day })
    res.json({ message: "Meal deleted" })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
