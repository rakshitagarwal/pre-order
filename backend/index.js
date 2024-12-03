const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { mongoose } = require("mongoose");
const Dishes = require("./models/Dishes");
const Meal = require("./models/Meal");

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("Test Works");
});

app.post("/dishesadd", async (req, res) => {
  const { dishes } = req.body;
  try {
    const dishInfo = await Dishes.insertMany(dishes)
    res.json(dishInfo);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get("/alldishes", async (req, res) => {
  try {
    const dishInfo = await Dishes.find();
    res.json(dishInfo);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/addmeal", async (req, res) => {
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

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
