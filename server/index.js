const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const credentials = require("./models/Employee");
const { OpenAI } = require("openai");
require("dotenv").config();
const bodyParser = require("body-parser");
const Nutrition = require("./models/Nutrition"); // Import the Nutrition model
const { DatasetController } = require("chart.js");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/user", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/", (req, res) => {
  console.log("Request received:");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  const { totalCarbs, totalProtein, totalFiber, totalSugar, date } = req.body;
  if (!totalCarbs || !totalProtein || !totalFiber || !totalSugar || !date) {
    return res.status(400).json({ error: "Missing data in request body" });
  }

  const nutrition = new Nutrition({
    totalCarbs: parseFloat(totalCarbs.toFixed(2)),
    totalProtein: parseFloat(totalProtein.toFixed(2)),
    totalFiber: parseFloat(totalFiber.toFixed(2)),
    totalSugar: parseFloat(totalSugar.toFixed(2)),
    date,
  });

  nutrition
    .save()
    .then((savedNutrition) => {
      res.json({
        message: "Nutrition data logged successfully",
        savedNutrition,
      });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "An error occurred while logging nutrition data" });
    });
});

app.get("/performance", async (req, res) => {
  try {
    const nutritionData = await Nutrition.find({}, { _id: 0, __v: 0 });
    console.log("Nutrition Data:", nutritionData);

    const totalCarbs = nutritionData.map((item) => item.totalCarbs.toFixed(2));
    const totalProtein = nutritionData.map((item) =>
      item.totalProtein.toFixed(2)
    );
    const totalFiber = nutritionData.map((item) => item.totalFiber.toFixed(2));
    const totalSugar = nutritionData.map((item) => item.totalSugar.toFixed(2));
    const date = nutritionData.map((item) => item.date);

    res.json({ totalCarbs, totalProtein, totalFiber, totalSugar, date });
  } catch (error) {
    console.error("Error fetching performance data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching performance data" });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  credentials.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) res.json("success");
      else res.json("the password is incorrect");
    } else res.json("no record existed");
  });
});

app.post("/register", (req, res) => {
  credentials
    .create(req.body)
    .then((employees1) => res.json(employees1))
    .catch((err) => res.json(err));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log("server is running at port:", PORT);
});
