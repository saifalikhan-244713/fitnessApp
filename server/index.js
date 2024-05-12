const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const credentials = require("./models/Employee");
const { OpenAI } = require("openai");
require("dotenv").config();
const bodyParser = require("body-parser");
const Nutrition = require("./models/Nutrition"); // Import the Nutrition model

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/user", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.post("/", async (req, res) => {
  // const { prompt } = req.body;

  // const completion = await openai.completions.create({
  //   model: "gpt-3.5-turbo-instruct",
  //   prompt: prompt,
  //   max_tokens: 30,
  // });
  // console.log(completion.choices[0].text);
  // res.json({ response: completion.choices[0].text });

  const { totalCarbs, totalProtein, totalFiber, totalSugar } = req.body;
  // Send the response back to the client

  try {
    console.log("total carbs", totalCarbs);
    // Create a new instance of the Nutrition model with the data
    const nutrition = new Nutrition({
      totalCarbs,
      totalProtein,
      totalFiber,
      totalSugar,
    });

    // Save the nutrition data to MongoDB
    const savedNutrition = await nutrition.save();

    // Respond with a success message
    res.json({ message: "Nutrition data logged successfully" });
  } catch (error) {
    // If an error occurs, respond with an error message
    res
      .status(500)
      .json({ error: "An error occurred while logging nutrition data" });
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
PORT = 3001;
app.listen(PORT, () => {
  console.log("server is running at port:", PORT);
});
