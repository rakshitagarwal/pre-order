const express = require("express");
const cors = require("cors");
const app = express();
const Meal = require('./models/Meal')
require('dotenv').config()
const { mongoose } = require('mongoose');

app.use(express.json())
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("Test Works");
});

app.listen(4000);
