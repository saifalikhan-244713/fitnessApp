const mongoose = require("mongoose");

const nutritionSchema = new mongoose.Schema({
  totalCarbs: Number,
  totalProtein: Number,
  totalFiber: Number,
  totalSugar: Number,
});

//Nutrtiton = collection with a schema defined in nutritionSchema

module.exports = mongoose.model("Nutrition", nutritionSchema);
