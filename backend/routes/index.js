const express = require("express");
const Meal = require("../models/Meal");
const router = express.Router();

router.use('/alldishes', async (req, res) => {
  try {
    const response = await fetch('https://yudiz-solution.s3.ap-south-1.amazonaws.com/dishes.json');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data from the external source' });
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
