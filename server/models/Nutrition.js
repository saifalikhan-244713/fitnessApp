const mongoose = require("mongoose");

const nutritionSchema = new mongoose.Schema({
  totalCarbs: Number,
  totalProtein: Number,
  totalFiber: Number,
  totalSugar: Number,
  datee: { type: Date, required: true }, // Ensure you have a date field
});

//Nutrtiton = collection with a schema defined in nutritionSchema
module.exports = mongoose.model("Nutrition", nutritionSchema);
