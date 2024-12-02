const mongoose = require("mongoose");
const { Schema } = mongoose;

const MealSchema = new Schema({
  meal: String,
  people: Number,
  restaurant: String,
  dishes: String,
  servings: String,
});

const Meal = mongoose.model("Meal", MealSchema);

module.exports = Meal;