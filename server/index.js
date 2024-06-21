require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Nutrition = require("./models/Nutrition");
const authRoutes = require("./routes/authRoutes");

const app = express();

const prodOrigins = [process.env.ORIGIN_1, process.env.ORIGIN_2];
const devOrigin = ["http://localhost:5173"];
const allowedOrigins = (process.env.NODE_ENV = "production"
  ? prodOrigins
  : devOrigin);
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        console.log(origin, allowedOrigins);
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log("Request received:");
  console.log("Headers:", req.headers);
  console.log("Body here:", req.body);
  console.log("req.body.email", req.body.email);
  next();
});

// const app = express();

app.use(cors());
app.use("/api/auth", authRoutes); // Use authRoutes for authentication-related routes

mongoose
  .connect("mongodb://localhost:27017/myjwt2")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/api/logs", async (req, res) => {
  const { email, value } = req.body;
  try {
    const log = new Log({ email, value });
    await log.save();
    res.status(201).json({ message: "Value logged successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging value" });
  }
});

app.get("/api/logs", async (req, res) => {
  const { email } = req.query;
  try {
    const logs = await Log.find({ email });
    res.status(200).json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching logs" });
  }
});

app.post("/", (req, res) => {
  console.log("Request received:");
  console.log("Headers:", req.headers);
  console.log("Body here:", req.body);

  const { totalCarbs, totalProtein, totalFiber, totalSugar, date, email } =
    req.body;

  if (
    !totalCarbs ||
    !totalProtein ||
    !totalFiber ||
    !totalSugar ||
    !date ||
    !email
  ) {
    return res.status(400).json({ error: "Missing data in request body" });
  }

  const nutrition = new Nutrition({
    totalCarbs: parseFloat(totalCarbs.toFixed(2)),
    totalProtein: parseFloat(totalProtein.toFixed(2)),
    totalFiber: parseFloat(totalFiber.toFixed(2)),
    totalSugar: parseFloat(totalSugar.toFixed(2)),
    date,
    email,
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
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email query parameter is required" });
  }

  try {
    const nutritionData = await Nutrition.find({ email }, { _id: 0, __v: 0 });
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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
