const router = require("express").Router()
const Recipe = require("../models/Recipe")
const User = require("../models/Users")


router.get("/search/:query", async (req, res) => {
  try {
    const { query } = req.params
    const regex = new RegExp(query, "i")
    const recipes = await Recipe.find({ title: regex })
    res.json(recipes)
  } catch (err) {
    res.status(500).json({ message: "Error searching recipes", error: err })
  }
})

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find()
    res.json(recipes)
  } catch (err) {
    res.status(500).json(err)
  }
})


router.put("/favorite", async (req, res) => {
  try {
    const { userId, recipe } = req.body

    if (!userId || !recipe || !recipe.id) {
      return res.status(400).json({ message: "userId and recipe with id are required" })
    }

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const alreadyExists = user.favorites.find((r) => r.id === recipe.id)

    if (!alreadyExists) {
      user.favorites.push({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image
      })
      await user.save()
    }

    res.json(user.favorites)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router

