const express = require("express");
const Dishes = require("../models/Dishes");
const Meal = require("../models/Meal");
const router = express.Router();

router.get("/test", (req, res) => {
  res.json("Test Works");
});

router.post("/dishesadd", async (req, res) => {
  const { dishes } = req.body;
  try {
    const dishInfo = await Dishes.insertMany(dishes);
    res.json(dishInfo);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/alldishes", async (req, res) => {
  try {
    const dishInfo = await Dishes.find();
    res.json(dishInfo);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/addmeal", async (req, res) => {
  const { meal, people, restaurant, dishes, servings } = req.body;
  try {
    const mealInfo = await Meal.create({
      meal,
      people,
      restaurant,
      dishes,
      servings,
    });
    res.status(201).json(mealInfo);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
