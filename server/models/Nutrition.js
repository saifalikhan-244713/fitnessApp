const mongoose = require("mongoose");

const nutritionSchema = new mongoose.Schema({
  totalCarbs: Number,
  totalProtein: Number,
  totalFiber: Number,
  totalSugar: Number,
  date: String, 
  email: String, 
}); 

module.exports = mongoose.model("Nutrition", nutritionSchema);
