const mongoose = require("mongoose");
const { Schema } = mongoose;

const DishesSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  restaurant: { type: String, required: true },
  availableMeals: {
    type: [String],
    enum: ["lunch", "dinner", "breakfast"],
    required: true,
  },
});

const Dishes = mongoose.model("Dishes", DishesSchema);

module.exports = Dishes;
