const mongoose = require("mongoose");
const { Schema } = mongoose;

const DishesSchema = new Schema({
  id: Number,
  name: String,
  restaurant: String,
  availableMeals: {
    type: [String],
    enum: ["lunch", "dinner", "breakfast"],
    required: true,
  },
});

const Dishes = mongoose.model("Dishes", DishesSchema);

module.exports = Dishes;
