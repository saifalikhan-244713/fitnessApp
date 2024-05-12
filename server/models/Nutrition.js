const mongoose = require("mongoose");

const nutritionSchema = new mongoose.Schema({
  totalCarbs: Number,
  totalProtein: Number,
  totalFiber: Number,
  totalSugar: Number,
});

module.exports = mongoose.model("Nutrition", nutritionSchema);
