const mongoose = require("mongoose");
const { Schema } = mongoose;

const DishSchema = new Schema(
  {
    name: { type: String, required: true },
    servings: { type: Number, required: true },
  },
  { _id: false }
);

const MealSchema = new Schema({
  meal: { type: String, required: true },
  people: { type: Number, required: true },
  restaurant: { type: String, required: true },
  dishes: { type: [DishSchema], required: true },
});

const Meal = mongoose.model("Meal", MealSchema);

module.exports = Meal;
